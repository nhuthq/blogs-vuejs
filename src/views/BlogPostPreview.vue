<template>
  <div class="preview-container">
    <div class="container">
      <h2>{{ this.title }}</h2>
      <img :src="this.coverPhoto" alt="Cover Photo" />
      <div class="ql-editor" v-html="htmlContent"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPostPreview',
  computed: {
    title() {
      return this.$store.state.blogTitle;
    },
    coverPhoto() {
      return this.$store.state.blogCoverPhotoURL;
    },
    htmlContent() {
      return this.$store.state.blogHTMLContent;
    },
  },
};
</script>
<style lang="scss" scoped>
.preview-container {
  height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 26px;
  }
  .ql-editor {
    padding: 0;
  }
  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }
  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
