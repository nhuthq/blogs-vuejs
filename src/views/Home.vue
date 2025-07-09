<template>
  <div>
    <BlogPost :blogPost="welcomePost" />
    <BlogPost
      :blogPost="item"
      v-for="(item, index) in samplePosts"
      :key="index"
    />
    <div class="blog-cards-container">
      <div class="container">
        <h3>View More Recent Blog</h3>
        <div class="blog-cards-grid">
          <BlogCard
            :blogPost="item"
            v-for="(item, index) in samplePostCards"
            :key="index"
          />
        </div>
      </div>
    </div>
    <div class="subscribe-container">
      <div class="container">
        <h2>Never mis a post. Register for yoru free account today!</h2>
        <RouterLink class="router-button" to="#">
          Register for VeNtura Blogs <IcArrow class="arrow arrow-light" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '@/components/BlogPost.vue';
import BlogCard from '@/components/BlogCard.vue';
import IcArrow from '@/assets/Icons/arrow-right-light.svg';

export default {
  name: 'Home',
  components: {
    IcArrow,
    BlogPost,
    BlogCard,
  },
  data() {
    return {
      welcomePost: {
        id: '1',
        title: 'Welcome!',
        content:
          'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
        coverPhoto: 'coding',
        welcomeScreen: true,
        coverPhotoName: 'coding',
        isPublished: true,
        createdDate: '2025-07-04',
        lastEditedDate: '2025-07-04',
        author: {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          age: 30,
        },
      },
    };
  },
  computed: {
    samplePostCards() {
      return this.$store.state.samplePostCards;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-cards-container {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 100px 16px;
  }
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }

  .blog-cards-grid {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.subscribe-container {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (min-width: 800px) {
      padding: 125px 0;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      widows: 100%;
      text-align: center;
      transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
