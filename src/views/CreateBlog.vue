<template>
  <div class="create-blog-container">
    <Loading v-show="loading" />
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
            :disabled="!this.$store.state.blogPhotoFileURL"
            :class="{ 'inactive-button': !this.$store.state.blogPhotoFileURL }"
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
          v-model:content="this.blogHTML"
          placeholder="Write your blog content here..."
        />
      </div>
      <div class="blog-actions">
        <button
          @click="submitBlog"
          :class="{ 'inactive-button': !profileAdmin }"
        >
          Publish Blog
        </button>
        <button
          @click="previewBlog"
          :class="{ 'inactive-button': !profileAdmin }"
        >
          Post Review
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';

import Loading from '@/components/Loading.vue';
import ImageResize from 'quill-image-resize';
import ImageCompress from 'quill-image-compress';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  name: 'CreateBlog',
  components: {
    QuillEditor,
    Loading,
  },
  data() {
    return {
      error: false,
      loading: false,
      modalActive: false,
      errorMessage: '',
      submitBlogSuccessMessage: 'Blog has been successfully created',
    };
  },
  setup: () => {},
  computed: {
    isAdmin() {
      return this.$store.state.profileAdmin;
    },
    profileId() {
      return this.$store.state.profileId;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit('updateBlogTitle', payload);
      },
    },
    blogCoverPhotoName() {
      return this.$store.state.blogCoverPhotoName;
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
    },
    fileChange(event) {
      //   this.coverPhotoFile = event.target.files[0];
    },
    openPreviewCoverPhoto() {
      //   this.$store.state.blogPhotoPreview = true;
    },
    previewBlog() {
      //   this.$store.state.blogPhotoPreview = false;
    },
    submitBlog() {
      //   if (this.blogTitle === '' || this.blogHTML === '') {
      //     this.error = true;
      //     this.errorMessage = 'Please fill out all the fields';
      //     return;
      //   }
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
    }
  }

  .inactive-button {
    pointer-events: none;
    background-color: gray;
  }

  .blog-editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
