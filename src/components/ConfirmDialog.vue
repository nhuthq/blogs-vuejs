<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ this.modalMessage }}</p>
      <div class="buttons">
        <button @click="confirm">Delete</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modalMessage'],
  methods: {
    name: 'ConfirmDialog',
    confirm() {
      this.$emit('confirm');
    },

    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: #303030;
    border-radius: 8px;
    width: 80%;
    height: 40%;
    padding: 40px 30px;
    background-color: white;

    p {
      text-align: center;
      margin-bottom: 20px;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      button {
        height: 40px;
        width: auto;
        margin: 8px;
      }
    }
  }
}
</style>
