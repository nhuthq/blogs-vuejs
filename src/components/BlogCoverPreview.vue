<template>
  <div class="cover-preview-container" ref="preview-modal">
    <div class="preview-content">
      <CloseIcon @click="closePreview" class="icon" />
      <img :src="this.blogCoverPhoto" alt="Cover Photo" />
    </div>
  </div>
</template>

<script>
import CloseIcon from '@/assets/icons/times-circle-light.svg';
export default {
  name: 'BlogCoverPreview',
  components: {
    CloseIcon,
  },
  computed: {
    blogCoverPhoto() {
      return this.$store.state.blogCoverPhotoURL;
    },
  },
  methods: {
    closePreview() {
      this.$store.commit('updateBlogPhotoPreview', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.cover-preview-container {
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .preview-content {
    display: flex;
    position: relative;
    justify-content: center;
    width: 600px;
    height: 400px;
    padding: 50px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    .icon {
      position: absolute;
      top: 15px;
      right: 15px;
      color: #303030;
      width: 24px;
      height: auto;
      cursor: pointer;
      font-size: 24px;
    }

    img {
      margin-top: 16px;
      display: block;
      width: auto;
      height: 100%;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
