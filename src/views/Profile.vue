<template>
  <div class="profile">
    <Loading v-if="loading" />
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <div class="container">
      <h2>Account Setting</h2>
      <div class="profile-info">
        <div class="initials">
          {{ this.$store.state.profileInitials }}
        </div>
        <div class="admin-badge">
          <AdminIcon class="icon" />
          <span>Admin</span>
        </div>
        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="userName">User Name:</label>
          <input type="text" id="userName" v-model="userName" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" />
        </div>
        <div v-show="error" class="error">{{ errorMessage }}</div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import Loading from '@/components/Loading.vue';
import AdminIcon from '@/assets/icons/user-crown-light.svg';

export default {
  name: 'Profile',
  components: {
    Modal,
    Loading,
    AdminIcon,
  },
  data() {
    return {
      error: false,
      loading: false,
      modalActive: false,
      errorMessage: '',
      modalUpdateSuccessMessage: 'Changes were saved!',
    };
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },
      set(payload) {
        this.$store.commit('changeFirstName', payload);
      },
    },
    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },
      set(payload) {
        this.$store.commit('changeLastName', payload);
      },
    },
    userName: {
      get() {
        return this.$store.state.profileUserName;
      },
      set(payload) {
        this.$store.commit('changeUserName', payload);
      },
    },
    email: {
      get() {
        return this.$store.state.profileEmail;
      },
    },
  },
  methods: {
    updateProfile() {
      console.log('updateProfile');
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      font-size: 32px;
      font-weight: 300;
      mask-border: 16px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: white;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        color: white;
        background-color: #303030;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: white;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 15px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }

      .input {
        padding: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }

        input {
          width: 100%;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          border: none;

          &:focus {
            outline: auto;
          }
        }
      }
      button {
        align-self: center;
      }
    }
  }
}
</style>
