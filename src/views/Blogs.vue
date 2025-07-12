<template>
  <div class="blog-cards-container container">
    <div v-show="isAdmin" class="toggle-edit">
      <span>Toggle Editing Mode</span>
      <input type="checkbox" v-model="editMode" />
    </div>
    <div class="blog-cards-grid">
      <BlogCard :blogPost="item" v-for="(item, index) in blogs" :key="index" />
    </div>
  </div>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue';

export default {
  name: 'Blogs',
  components: {
    BlogCard,
  },
  computed: {
    isAdmin() {
      return this.$store.state.profileAdmin;
    },
    blogs() {
      return this.$store.state.blogPosts;
    },
    editMode: {
      get() {
        return this.$store.state.editMode;
      },
      set(payload) {
        this.$store.commit('toggleEditMode', payload);
      },
    },
  },
  beforeRouteLeave() {
    this.$store.commit('toggleEditMode', false);
  },
};
</script>

<style lang="scss" scoped>
.blog-cards-container {
  display: flex;
  flex-direction: column;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards-grid {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;
    margin-top: 70px;

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
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: flex-end;
    justify-content: center;

    span {
      margin-right: 16px;
    }

    input[type='checkbox'] {
      position: relative;
      border: none;
      appearance: none;
      background-color: white;
      outline: none;
      width: 60px;
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
      background: rgb(100, 92, 92);
      transform: scale(1.1);
      transition: 500ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type='checkbox']:before {
      background: #303030;
      left: 30px;
    }
  }
}
</style>
