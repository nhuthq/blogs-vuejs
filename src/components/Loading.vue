<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style lang="scss" setup>
.loading {
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }

  span {
    display: block;
    width: 60px;
    height: 60px;
    border: 3px solid transparent;
    border-top-color: white;
    border-radius: 50%;
    animation: spin ease 1s infinite;
  }
}
</style>
