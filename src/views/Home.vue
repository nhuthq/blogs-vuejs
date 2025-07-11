<template>
  <div>
    <BlogPost :blogPost="welcomePost" />
    <BlogPost
      :blogPost="item"
      v-for="(item, index) in samplePosts"
      :key="index"
    />
  </div>
</template>

<script>
import BlogPost from '@/components/BlogPost.vue';
export default {
  name: 'Home',
  components: {
    BlogPost,
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
      samplePosts: [
        {
          id: '2',
          title: 'Sample Post 1',
          content: 'Sample content 1',
          coverPhoto: 'codingnight',
          coverPhotoName: 'codingnight',
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
        {
          id: '3',
          title: 'Sample Post 2',
          content: 'Sample content 2',
          coverPhoto: 'photographer',
          coverPhotoName: 'photographer',
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
      ],
    };
  },
};
</script>

<style></style>
