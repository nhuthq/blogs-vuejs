<template>
  <div class="add-admin-container">
    <Loading v-if="loading" />
    <Modal
      v-if="modalActive"
      v-on:close-modal="closeModal"
      :modalMessage="addAdminSuccessMessage"
    />
    <div class="container">
      <h2>Administration</h2>
      <div class="admin-info">
        <h2>Add Admin</h2>
        <div class="input">
          <input
            type="email"
            placeholder="Email"
            v-model="adminEmail"
            :disabled="!isAdmin"
          />
        </div>
        <div v-show="error" class="error">{{ this.errorMessage }}</div>
        <button @click.prevent="addAdmin" class="button" v-show="isAdmin">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  doc,
  firestoreDB,
  firebaseAuth,
  signInWithEmailAndPassword,
} from '@/services/firebase/firebaseInit';
import { isValidEmail } from '@/helpers/utility';

import Modal from '@/components/Modal.vue';
import Loading from '@/components/Loading.vue';

export default {
  name: 'AddAdmin',
  components: {
    Modal,
    Loading,
  },
  data() {
    return {
      error: false,
      loading: false,
      modalActive: false,
      adminEmail: '',
      errorMessage: '',
      addAdminSuccessMessage:
        'Congratulations! Your account have been successfully created.',
    };
  },
  computed: {
    isAdmin() {
      return this.$store.state.profileAdmin;
    },
  },
  methods: {
    async addAdmin() {
      if (this.adminEmail === '') {
        this.error = true;
        this.loading = false;
        this.errorMessage = 'Please fill out all the fields';
        return;
      }

      if (!isValidEmail(this.adminEmail)) {
        this.error = true;
        this.loading = false;
        this.errorMessage = 'Please enter a valid email address';
        return;
      }

      this.loading = true;
      this.error = false;
      this.errorMessage = '';

      const data = {
        isAdmin: true,
      };
      const userId = firebaseAuth.currentUser.uid;
      const docRef = doc(firestoreDB, 'users', userId);
      console.log('docRef: ', docRef);

      setTimeout(() => {
        this.loading = false;
        this.modalActive = true;
      }, 2000);

      // await setDoc(docRef, data, { merge: true })
      //   .then((respone) => {
      //     console.log('Document update with ID: ', respone);
      //   })
      //   .catch((error) => {
      //     console.log('Error getting document:', error);
      //   });
      // commit('setProfileInitials');

      // await signInWithEmailAndPassword(firebaseAuth, this.email)
      //   .then((response) => {
      //     console.log('response: ', JSON.stringify(response, null, 2));
      //     this.error = false;
      //     this.loading = false;
      //     this.modalActive = true;
      //   })
      //   .catch((error) => {
      //     switch (error.code) {
      //       case 'auth/invalid-email':
      //         this.errorMessage = 'Invalid email';
      //         break;
      //       case 'auth/user-not-found':
      //         this.errorMessage = 'No account with that email was found';
      //         break;
      //       case 'auth/wrong-password':
      //         this.errorMessage = 'Incorrect password';
      //         break;
      //       default:
      //         this.errorMessage = 'Email was incorrect';
      //         break;
      //     }
      //     this.error = true;
      //     this.loading = false;
      //   });
    },
    closeModal() {
      this.adminEmail = '';
      this.modalActive = !this.modalActive;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-admin-container {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      font-size: 32px;
      font-weight: 300;
      margin-bottom: 16px;
    }

    .admin-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      background-color: #f1f1f1;
      padding: 32px;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      span {
        font-size: 14px;
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }

        input {
          width: 100%;
          height: 50px;
          padding: 8px;
          border: none;
          border-radius: 8px;
          background-color: #f2f7f6;

          &:focus {
            outline: none;
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
