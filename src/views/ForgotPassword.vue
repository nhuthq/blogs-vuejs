<template>
  <div class="forgot-password-container">
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

<script lang="ts">
import { RouterLink } from 'vue-router';
import Email from '@/assets/Icons/envelope-regular.svg';

export default {
  name: 'ForgotPassword',
  components: {
    Email,
    RouterLink,
  },
  data() {
    return {
      email: '',
      error: false,
      errorMessage: '',
    };
  },
  methods: {
    handleRegister() {
      console.log('handleReset');
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
