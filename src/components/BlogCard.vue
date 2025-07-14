<template>
  <div class="main-container">
    <ConfirmDialog
      :modalMessage="deleteConfirmMessage"
      v-if="confirmDeleteModal"
      v-on:confirm="deletePost"
      v-on:closeModal="closeModal"
    />
    <div v-if="editMode" class="icons">
      <div class="icon" @click="editBlog">
        <IcEdit class="edit" />
      </div>
      <div class="icon" @click="confirmDelete">
        <IcDelete class="delete" />
      </div>
    </div>
    <img
      :src="blog.coverPhotoURL"
      :alt="blog.coverPhotoName"
      @click="viewBlog"
    />
    <div class="content-container">
      <h4>{{ blog.title }}</h4>
      <h6>
        Posted on:
        {{
          new Date(blog.createdDate).toLocaleString('en-us', {
            dateStyle: 'long',
          })
        }}
      </h6>
      <RounterLink class="link" @click="viewBlog"
        >View The Pose <IcArrow class="arrow"
      /></RounterLink>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router';

import ConfirmDialog from './ConfirmDialog.vue';
import IcEdit from '@/assets/Icons/edit-regular.svg';
import IcDelete from '@/assets/Icons/trash-regular.svg';
import IcArrow from '@/assets/Icons/arrow-right-light.svg';

export default {
  name: 'BlogCard',
  props: ['blog'],
  components: {
    IcEdit,
    IcArrow,
    IcDelete,
    RouterLink,
    ConfirmDialog,
  },
  data() {
    return {
      confirmDeleteModal: false,
      errorMessage: '',
      deleteConfirmMessage: 'Are you sure to delete this blog?',
    };
  },
  setup() {
    const store = useStore();
    const editMode = computed({
      get() {
        return store.state.editMode;
      },
      set(value) {
        store.commit('toggleEditMode', value);
      },
    });

    return {
      editMode,
    };
  },

  methods: {
    viewBlog() {
      this.$router.push({
        name: 'BlogDetails',
        params: { blogId: this.blog.id },
      });
    },
    closeModal() {
      this.confirmDeleteModal = !this.confirmDeleteModal;
    },
    deletePost() {
      this.$store.dispatch('deletePost', this.blog.id);
      this.confirmDeleteModal = !this.confirmDeleteModal;
    },
    editBlog() {
      this.$router.push({
        name: 'EditBlog',
        params: { blogId: this.blog.id },
      });
    },
    confirmDelete() {
      this.confirmDeleteModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  color: white;
  display: flex;
  border-radius: 8px;
  min-height: 420px;
  position: relative;
  flex-direction: column;
  justify-content: center;
  transition: all 0.5s ease-in-out;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: white;
      transition: all 0.5s ease all;

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
        color: #303030;
      }

      &:hover {
        background-color: #303030;
        .edit,
        .delete {
          color: white;
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }
    }
  }

  img {
    cursor: pointer;
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: black;
    background-color: white;
    border-radius: 0 0 8px 8px;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }

    h6 {
      padding-bottom: 16px;
      font-size: 12px;
      font-weight: 400;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: all 0.5s ease-in all;
    }

    &:hover {
      color: #303030;
    }

    .arrow {
      width: 10px;
    }
  }
}
</style>
