<template>
  <div class="login-container">
    <Loading v-if="loading" />
    <form class="login-form">
      <h2>Welcome Back</h2>
      <div class="inputs-container">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <Email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <Password class="icon" />
        </div>
      </div>
      <RouterLink :to="{ name: 'ForgotPassword' }" class="forgot-password-link"
        >Forgot Password?</RouterLink
      >
      <div v-show="error" class="error">{{ errorMessage }}</div>
      <button @click.prevent="handleLogin">Login</button>
      <p class="register-link">
        Don't have an account?
        <RouterLink :to="{ name: 'Register' }" class="router-link"
          >Register</RouterLink
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
  signInWithEmailAndPassword,
  // @ts-ignore
} from '@/services/firebase/firebaseInit';
import { RouterLink } from 'vue-router';
// @ts-ignore
import { isValidEmail } from '../helpers/utility';

import Loading from '@/components/Loading.vue';
import Email from '@/assets/Icons/envelope-regular.svg';
import Password from '@/assets/Icons/lock-alt-solid.svg';

export default {
  name: 'Login',
  components: {
    Email,
    Loading,
    Password,
    RouterLink,
  },
  data() {
    return {
      error: false,
      loading: false,
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      if (this.email === '' || this.password === '') {
        this.error = true;
        this.errorMessage = 'Please fill out all the fields';
        return;
      }
      if (!isValidEmail(this.email)) {
        this.error = true;
        this.errorMessage = 'Please enter a valid email address';
        return;
      }
      this.loading = true;
      await signInWithEmailAndPassword(firebaseAuth, this.email, this.password)
        .then(() => {
          this.error = false;
          this.loading = false;
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.errorMessage = 'Invalid email';
              break;
            case 'auth/user-not-found':
              this.errorMessage = 'No account with that email was found';
              break;
            case 'auth/wrong-password':
              this.errorMessage = 'Incorrect password';
              break;
            default:
              this.errorMessage = `${error}`;
              console.log('Erorr: ', error);
              break;
          }
          this.error = true;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
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

  .login-form {
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

    .register-link {
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

    .forgot-password-link {
      cursor: pointer;
      text-decoration: none;
      color: #000;
      font-size: 14px;
      margin: 12px 0;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
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
