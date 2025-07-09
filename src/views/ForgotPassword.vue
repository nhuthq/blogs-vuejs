<template>
  <div class="forgot-password-container">
    <Loading v-if="loading" />
    <Modal
      v-if="modalActive"
      v-on:close-modal="closeModal"
      :modalMessage="modalMessage"
    />
    <form class="forgot-password-form">
      <h2>Let’s Get You In</h2>
      <p>Forgot your password? Enter your email to reset it</p>
      <div class="inputs-container">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <Email class="icon" />
        </div>
        <div v-show="error" class="error">{{ errorMessage }}</div>
      </div>
      <button @click.prevent="handleRegister">Submit</button>
      <p class="login-link">
        Back to
        <RouterLink class="router-link" :to="{ name: 'Login' }"
          >Login</RouterLink
        >
      </p>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import {
  firebaseAuth,
  sendPasswordResetEmail,
  // @ts-ignore
} from '@/services/firebase/firebaseInit';
import { RouterLink } from 'vue-router';
// @ts-ignore
import { isValidEmail } from '@/helpers/utility';

import Modal from '@/components/Modal.vue';
import Loading from '@/components/Loading.vue';
import Email from '@/assets/Icons/envelope-regular.svg';

export default {
  name: 'ForgotPassword',
  components: {
    Email,
    Modal,
    Loading,
    RouterLink,
  },
  data() {
    return {
      error: false,
      loading: false,
      modalActive: false,
      email: '',
      modalMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleRegister() {
      if (this.email === '') {
        this.error = true;
        this.errorMessage = 'Please fill out all the fields';
        return;
      }

      if (!isValidEmail(this.email)) {
        this.error = true;
        this.errorMessage = 'Please enter a valid email address';
        return;
      }

      this.error = false;
      this.loading = true;
      await sendPasswordResetEmail(firebaseAuth, this.email)
        .then(() => {
          this.loading = false;
          this.modalActive = true;
          this.modalMessage = `A reset link have been sent to this mail: ${this.email}`;
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.errorMessage = 'Invalid email';
              break;
            case 'auth/user-not-found':
              this.errorMessage = 'No account with that email was found';
              break;
            default:
              this.errorMessage = `${error}`;
              console.log('Erorr: ', error);
              break;
          }
          this.error = true;
          this.loading = false;
          this.modalActive = false;
        });
    },
    closeModal() {
      this.email = '';
      this.modalActive = !this.modalActive;
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style lang="scss" scoped>
.forgot-password-container {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  background-color: #fff;
  @media (min-width: 1366px) {
    width: 100%;
  }

  .forgot-password-form {
    flex: 1;
    height: 100%;
    padding: 100px 25px;
    background-color: white;
  }

  form {
    padding: 0 20px;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    @media (min-width: 700px) {
      padding: 0 90px;
    }

    button {
      margin-bottom: 12px;
      transition: 0.5s ease all;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 700px) {
        font-size: 40px;
      }
    }

    .inputs-container {
      width: 100%;
      max-width: 350px;
      margin-top: 32px;
      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 12px;
        input {
          width: 100%;
          height: 50px;
          padding: 8px 8px 8px 38px;
          border: none;
          border-radius: 12px;
          background-color: #f2f7f6;

          &:focus {
            outline: none;
          }
        }
        .icon {
          width: 12px;
          position: absolute;
          left: 12px;
        }
      }
    }

    .login-link {
      font-size: 14px;
      margin: 12px 0;
      color: #000;
      .router-link {
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease all;

        &:hover {
          border-color: #303030;
        }
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: white;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 110%;
      @media (min-width: 1366px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url('../assets/background.png');
    width: 100%;
    height: 100%;
    @media (min-width: 1366px) {
      display: initial;
    }
  }
}
</style>
