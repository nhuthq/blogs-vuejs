<template>
  <div class="main-container">
    <Loading v-show="loading" />
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Modal
      v-if="modalActive"
      v-on:close-modal="closeModal"
      :modalMessage="submitBlogSuccessMessage"
    />
    <div class="content-container container">
      <div :class="{ invisible: !error }" class="error-message">
        <p><span>Error: </span>{{ this.errorMessage }}</p>
      </div>
      <div class="blog-title-container">
        <input
          type="text"
          placeholder="Enter blog title"
          v-model="this.blogTitle"
        />
        <div class="upload-file-container">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            id="blog-photo"
            ref="blogPhoto"
            @change="fileChange"
            accept=".png, .jpg, ,jpeg"
          />
          <button
            class="btn-preview"
            @click="previewCoverPhoto"
            :disabled="!this.$store.state.blogCoverPhotoURL"
            :class="{
              'inactive-button': !this.$store.state.blogCoverPhotoURL,
            }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.blogCoverPhotoName }}</span>
        </div>
      </div>
      <div class="editor-container">
        <QuillEditor
          toolbar="full"
          :modules="modules"
          contentType="html"
          v-model:content="this.blogHTMLContent"
          placeholder="Write your blog content here..."
        />
      </div>
      <div class="actions-container">
        <button
          @click="submitChanges"
          :class="{ 'inactive-button': !isAdmin || !isAvailableToCreate }"
        >
          Submit Changes
        </button>
        <button
          @click="previewBlog"
          :class="{ 'inactive-button': !isAdmin || !isAvailableToCreate }"
        >
          Post Review
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  doc,
  updateDoc,
  uploadBytes,
  firestoreDB,
  deleteObject,
  getDownloadURL,
  firebaseStorage,
} from '@/services/firebase/firebaseInit';
import { QuillEditor } from '@vueup/vue-quill';

import Modal from '@/components/Modal.vue';
import Loading from '@/components/Loading.vue';
import BlogCoverPreview from '@/components/BlogCoverPreview.vue';

import ImageResize from 'quill-image-resize';
import ImageCompress from 'quill-image-compress';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  name: 'EditBlog',
  components: {
    Modal,
    Loading,
    QuillEditor,
    BlogCoverPreview,
  },
  data() {
    return {
      error: false,
      loading: false,
      modalActive: false,

      routeID: null,
      currentBlog: null,
      coverPhotoFile: null,

      errorMessage: '',
      submitBlogSuccessMessage: 'Blog has been successfully edited!',
    };
  },
  setup() {
    const editorModules = [
      {
        namespace: 'imageResize',
        module: ImageResize,
        options: {
          handleStyle: {
            border: 'none',
            color: '#303030',
            backgroundColor: '#303030',
          },
        },
      },
      {
        name: 'imageCompress',
        module: ImageCompress,
        options: {
          quality: 0.7, // default
          imageType: ['image/jpeg', 'image/jpg', 'image/png'], // default
          debug: true, // default
          suppressErrorLogging: false, // default
          handleOnPaste: true, //default
          insertIntoEditor: (imageBase64URL, imageBlob, editor) => {
            const range = editor.getSelection();
            editor.insertEmbed(
              range.index,
              'image',
              `${imageBase64URL}`,
              'user'
            );
          },
        },
      },
    ];
    return { editorModules };
  },
  async mounted() {
    //: MARK - GET CURRENT BLOG ID
    this.routeID = this.$route.params.blogId;
    this.currentBlog = await this.$store.state.blogPosts.filter((blog) => {
      return blog.id === this.routeID;
    });
    this.$store.commit('setBlogState', this.currentBlog[0]);
  },
  computed: {
    isAdmin() {
      return this.$store.state.profileAdmin;
    },
    profileId() {
      return this.$store.state.profileId;
    },
    isAvailableToCreate: {
      get() {
        return (
          this.blogTitle !== '' &&
          this.blogHTMLContent.replace(/<[^>]*>/g, '').trim() !== '' &&
          (this.coverPhotoFile != null || this.blogCoverPhotoName !== '')
        );
      },
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit('updateBlogTitle', payload);
      },
    },
    blogHTMLContent: {
      get() {
        return this.$store.state.blogHTMLContent;
      },
      set(payload) {
        this.$store.commit('updateBlogHTMLContent', payload);
      },
    },
    blogCoverPhotoURL: {
      get() {
        return this.$store.state.blogCoverPhotoURL;
      },
      set(payload) {
        this.$store.commit('updateBlogCoverPhotoURL', payload);
      },
    },
    blogCoverPhotoName: {
      get() {
        return this.$store.state.blogCoverPhotoName;
      },
      set(payload) {
        this.$store.commit('updateBlogCoverPhotoName', payload);
      },
    },
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.$router.push({ name: 'Home' });
    },
    fileChange() {
      this.coverPhotoFile = this.$refs.blogPhoto.files[0];
      const fileName = this.coverPhotoFile.name;
      const fileURL = URL.createObjectURL(this.coverPhotoFile);
      console.log('HERE: ', this.coverPhotoFile);

      this.$store.commit('updateBlogCoverPhotoURL', fileURL);
      this.$store.commit('updateBlogCoverPhotoName', fileName);
    },
    clearForm() {
      this.blogTitle = '';
      this.blogHTMLContent = '<p></p>';
      this.blogCoverPhotoURL = null;
      this.blogCoverPhotoName = '';
    },
    previewBlog() {
      this.$router.push({ name: 'BlogPreview' });
    },
    previewCoverPhoto() {
      this.$store.commit('updateBlogPhotoPreview', true);
    },
    async submitChanges() {
      if (!this.isAvailableToCreate) {
        this.error = true;
        this.errorMessage =
          'Please ensure Blog Title & Blog Post & Cover Photo has been filled!';
        return;
      }

      this.loading = true;
      this.error = false;
      this.errorMessage = '';
      const editedTime = Date.now();

      // Get previous cover name
      const previousCoverPhotoName = this.currentBlog[0].coverPhotoName;
      const coverPhotoRef = ref(
        firebaseStorage,
        `BlogPostCoverPhotos/${this.routeID}${previousCoverPhotoName}`
      );

      // Delete previous cover
      await deleteObject(coverPhotoRef)
        .then((response) => {
          console.log(
            'FireStore file deleted: ',
            JSON.stringify(response, null, 2)
          );

          // Upload new cover photo
          uploadBytes(coverPhotoRef, this.coverPhotoFile).then(async () => {
            try {
              const downloadURL = await getDownloadURL(
                ref(coverPhotoRef)
              ).catch((error) => {
                this.error = true;
                this.loading = false;
                this.errorMessage = `Error get image download URL: ${error}`;
                console.error(errorMessage);
              });

              const timestamp = Date.now();
              const blogsDocRef = doc(firestoreDB, 'blogs', this.routeID);
              const blogData = {
                title: this.blogTitle,
                shortDescription: '',
                htmlContent: this.blogHTMLContent,
                coverPhotoURL: downloadURL,
                coverPhotoName: this.blogCoverPhotoName,
                authorID: this.profileId,
                isPublished: false,
                lastEditedDate: timestamp,
              };

              await updateDoc(blogsDocRef, blogData).then(async (response) => {
                this.clearForm();
                await this.$store.dispatch('updateBlog');
                console.log(
                  'Blog submitted successfully',
                  JSON.stringify(response, null, 2)
                );
                setTimeout(() => {
                  this.loading = false;
                  this.modalActive = true;
                }, 2000);
              });
            } catch (error) {
              this.error = true;
              this.loading = false;
              this.errorMessage = `Error whilte submitting Blog: ${error.message}`;
              console.error(this.errorMessage);
            }
          });
        })
        .catch((error) => {
          this.error = true;
          this.loading = false;
          this.errorMessage = `Error occurred while deleting previous cover photo: ${error.message}`;
          console.error(this.errorMessage);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  width: 100%;

  button {
    margin-top: 0;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    padding: 0 25px;
    @media (min-width: 1440px) {
      padding: 0;
    }
  }

  label,
  button {
    cursor: pointer;
    align-self: center;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 20px;
    text-decoration: none;
    color: white;
    background-color: #303030;
    transition: 0.5s ease-in-out all;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .invisible {
    opacity: 0 !important;
  }

  .error-message {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 8px;
    color: white;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-title-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    @media (min-width: 1440px) {
      flex-direction: row;
    }

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      transition: 0.5s ease-in-out all;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;
      flex: 1;
      margin-left: 0;
      margin-top: 16px;

      @media (min-width: 1440px) {
        padding: 0;
        margin-top: 0;
        margin-left: 16px;
        flex-direction: row;

        justify-content: flex-start;
      }

      label {
        align-self: flex-start;
      }

      input {
        display: none;
      }

      .btn-preview {
        text-transform: initial;
        align-self: flex-start;
      }

      span {
        font-size: 16px;
        align-self: flex-start;
        @media (min-width: 1440px) {
          align-self: center;
        }
      }
    }
  }

  .inactive-button {
    pointer-events: none;
    background-color: gray;
  }

  .editor-container {
    height: 60vh;
    overflow: scroll;
  }

  .actions-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 1440px) {
      justify-content: flex-start;
    }

    button {
      margin: 32px 0;
      @media (min-width: 1440px) {
        margin-right: 16px;
        justify-content: space-between;
      }
    }
  }
}
</style>
