<template>
  <div class="blog-cards-container">
    <div class="blog-cards-grid container">
      <BlogCard
        :blogPost="item"
        v-for="(item, index) in samplePosts"
        :key="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import BlogCard from '@/components/BlogCard.vue';
export default {
  name: 'Blogs',
  components: {
    BlogCard,
  },
  data() {
    return {
      samplePosts: [
        {
          id: '2',
          title: 'Sample Post 1',
          content: 'Sample content 1',
          coverPhoto: 'codingnight',
          coverPhotoName: 'codingnight',
          isPublished: true,
          welcomeScreen: false,
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
          welcomeScreen: false,
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

<style lang="scss" scoped>
.blog-cards-container {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 100px 16px;
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

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type='checkbox'] {
      cursor: pointer;
      position: relative;
      background-color: white;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type='checkbox']:before {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 500ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type='checkbox']:before {
      background: rgb(100, 92, 92);
      left: 52px;
    }
  }
}
</style>
