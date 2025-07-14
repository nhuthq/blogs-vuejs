<template>
  <div class="main-container">
    <div class="content-container container" v-if="currentBlog">
      <h2>{{ this.currentBlog[0].title }}</h2>
      <h4>
        Posted on:
        {{
          new Date(this.currentBlog[0].createdDate).toLocaleString('en-us', {
            dateStyle: 'long',
          })
        }}
      </h4>

      <img
        :src="this.currentBlog[0].coverPhotoURL"
        :alt="this.currentBlog[0].coverPhotoName"
      />
      <div class="html-content">CONTENT</div>
      <h4>
        Last edited on:
        {{
          new Date(this.currentBlog[0].lastEditedDate).toLocaleString('en-us', {
            dateStyle: 'long',
          })
        }}
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogDetails',
  data() {
    return {
      error: false,
      currentBlog: null,

      errorMessage: '',
    };
  },
  async mounted() {
    try {
      this.currentBlog = this.$store.state.blogPosts.filter((blog) => {
        return blog.id === this.$route.params.blogId;
      });
    } catch (error) {
      const errMess = 'Something went wrong, please try again later.';
      this.error = true;
      this.errorMessage = errMess;
      console.log(
        'Error when fetching blog details:',
        error.errorMessage || error
      );
    }
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  width: 100%;

  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 25px;
    @media (min-width: 1440px) {
      padding: 80px 0px;
    }
  }

  img {
    max-height: 600px;
    object-fit: cover;
    border-radius: 10px;
    margin: 20px 0;
  }

  .html-content {
    font-size: 18px;
    margin: 20px 0;
  }

  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-top: 8px;
  }
}
</style>
