<template>
  <div class="create-blog-container">
    <Loading v-show="loading" />
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Modal
      v-if="modalActive"
      v-on:close-modal="closeModal"
      :modalMessage="submitBlogSuccessMessage"
    />
    <div class="contaier">
      <div :class="{ invisible: !error }" class="error-message">
        <p><span>Error: </span>{{ this.errorMessage }}</p>
      </div>
      <div class="blog-info">
        <input
          type="text"
          placeholder="Enter blog title"
          v-model="this.blogTitle"
        />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            id="blog-photo"
            ref="blogPhoto"
            @change="fileChange"
            accept=".png, .jpg, ,jpeg"
          />
          <button
            class="preview"
            @click="openPreviewCoverPhoto"
            :disabled="!this.$store.state.blogCoverPhotoURL"
            :class="{ 'inactive-button': !this.$store.state.blogCoverPhotoURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.blogCoverPhotoName }}</span>
        </div>
      </div>
      <div class="blog-editor">
        <QuillEditor
          toolbar="full"
          :modules="modules"
          contentType="html"
          v-model:content="this.blogHTMLContent"
          placeholder="Write your blog content here..."
        />
      </div>
      <div class="blog-actions">
        <button
          @click="submitBlog"
          :class="{ 'inactive-button': !isAdmin || !isAvailableToCreate }"
        >
          Submit Blog
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
  setDoc,
  uploadBytes,
  firestoreDB,
  getDownloadURL,
  firebaseStorage,
} from '@/services/firebase/firebaseInit';
import { QuillEditor } from '@vueup/vue-quill';

import Modal from '@/components/Modal.vue';
import ImageResize from 'quill-image-resize';
import Loading from '@/components/Loading.vue';
import ImageCompress from 'quill-image-compress';
import BlogCoverPreview from '@/components/BlogCoverPreview.vue';

import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  name: 'CreateBlog',
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
      coverPhotoFile: null,
      errorMessage: '',
      submitBlogSuccessMessage: 'Blog has been successfully created',
    };
  },
  setup: () => {
    const modules = [
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
    return { modules };
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
    blogCoverPhotoURL: {
      get() {
        return this.$store.state.blogCoverPhotoURL;
      },
      set(payload) {
        this.$store.commit('updateBlogCoverPhotoURL', payload);
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
    blogCoverPhotoName: {
      get() {
        return this.$store.state.blogCoverPhotoName;
      },
      set(payload) {
        this.$store.commit('updateBlogCoverPhotoName', payload);
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

      this.$store.commit('updateBlogCoverPhotoURL', fileURL);
      this.$store.commit('updateBlogCoverPhotoName', fileName);
    },

    clearForm() {
      this.blogTitle = '';
      this.blogHTMLContent = '<p></p>';
      this.blogCoverPhotoName = '';
      this.blogCoverPhotoURL = null;
    },
    openPreviewCoverPhoto() {
      this.$store.commit('updateBlogPhotoPreview', true);
    },
    previewBlog() {
      this.$router.push({ name: 'BlogPreview' });
    },
    async submitBlog() {
      if (!this.isAvailableToCreate) {
        this.error = true;
        this.errorMessage =
          'Please ensure Blog Title & Blog Post & Cover Photo has been filled!';
        return;
      }

      this.loading = true;
      this.error = false;
      this.errorMessage = '';

      const blogID =
        new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
      const coverPhotoName = `${blogID}${this.blogCoverPhotoName}`;
      const coverPhotoRef = ref(
        firebaseStorage,
        `BlogPostCoverPhotos/${coverPhotoName}`
      );
      uploadBytes(coverPhotoRef, this.coverPhotoFile).then(async () => {
        try {
          const downloadURL = await getDownloadURL(ref(coverPhotoRef)).catch(
            (error) => {
              this.error = true;
              this.loading = false;
              this.errorMessage = error;
              console.error('Error get image download URL: ', error);

              return;
            }
          );

          const timestamp = Date.now();
          const blogsDocRef = doc(firestoreDB, 'blogs', blogID);
          const blogData = {
            id: blogID,
            title: this.blogTitle,
            shortDescription: '',
            htmlContent: this.blogHTMLContent,
            coverPhotoURL: downloadURL,
            coverPhotoName: this.blogCoverPhotoName,
            authorID: this.profileId,
            isPublished: false,
            createdDate: timestamp,
            lastEditedDate: timestamp,
          };

          await setDoc(blogsDocRef, blogData, { merge: true }).then(
            async () => {
              this.clearForm();
              // await this.$store.dispatch('getPosts');
              console.log('Blog submitted successfully');
              setTimeout(() => {
                this.loading = false;
                this.modalActive = true;
              }, 2000);
            }
          );
        } catch (error) {
          this.error = true;
          this.loading = false;
          this.errorMessage = `Error whilte submitting Blog: ${error.message}`;

          console.error(this.errorMessage);
          return;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-blog-container {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: white;
  }

  .contaier {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  label,
  button,
  .router-button {
    cursor: pointer;
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    border-radius: 20px;
    padding: 12px 24px;
    color: white;
    text-decoration: none;
    background-color: #303030;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .invisible {
    opacity: 0 !important;
  }

  .error-message {
    widows: 100%;
    padding: 12px;
    border-radius: 8px;
    color: white;
    margin-bottom: 10px;
    opacity: 1;
    background-color: #303030;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-chil(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 16px;
        margin-left: 16px;
        align-content: center;
      }

      .clear-file {
        margin-left: 16px;
        background-color: #ff6b6b;
        font-size: 12px;
        padding: 8px 16px;

        &:hover {
          background-color: rgba(255, 107, 107, 0.7);
        }
      }
    }
  }

  .inactive-button {
    pointer-events: none;
    background-color: gray;
  }

  .blog-editor {
    height: 60vh;
    overflow: auto;
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
