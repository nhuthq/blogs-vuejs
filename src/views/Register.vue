<template>
  <div class="register-container">
    <Loading v-if="loading" />
    <Modal
      v-if="modalActive"
      v-on:close-modal="closeModal"
      :modalMessage="resgisterSuccessMessage"
    />
    <form class="register-form">
      <h2>Let’s Get Started</h2>
      <div class="inputs-container">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="User Name" v-model="userName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <Email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <Password class="icon" />
        </div>
        <div v-show="error" class="error">{{ errorMessage }}</div>
      </div>
      <button @click.prevent="handleRegister">Sign Up</button>
      <p class="login-link">
        Already have an account?
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
  doc,
  setDoc,
  firestoreDB,
  firebaseAuth,
  createUserWithEmailAndPassword,
  // @ts-ignore
} from '@/services/firebase/firebaseInit';
import { RouterLink } from 'vue-router';

import Modal from '@/components/Modal.vue';
import Loading from '@/components/Loading.vue';
import User from '@/assets/Icons/user-alt-light.svg';
import Email from '@/assets/Icons/envelope-regular.svg';
import Password from '@/assets/Icons/lock-alt-solid.svg';

export default {
  name: 'Register',
  components: {
    User,
    Modal,
    Email,
    Loading,
    Password,
    RouterLink,
  },
  data() {
    return {
      error: false,
      loading: false,
      modalActive: false,
      email: '',
      password: '',
      lastName: '',
      userName: '',
      firstName: '',
      errorMessage: '',
      resgisterSuccessMessage:
        'Congratulations! Your account have been successfully created.',
    };
  },
  methods: {
    async handleRegister() {
      if (
        this.email === '' ||
        this.password === '' ||
        this.lastName === '' ||
        this.userName === '' ||
        this.firstName === ''
      ) {
        this.error = true;
        this.loading = false;
        this.errorMessage = 'Please fill out all the fields';
        return;
      }
      this.loading = true;
      this.error = false;
      this.errorMessage = '';

      await createUserWithEmailAndPassword(
        firebaseAuth,
        this.email,
        this.password
      )
        .then(async () => {
          try {
            const userID = firebaseAuth.currentUser?.uid;
            if (!userID) {
              this.error = true;
              this.loading = false;
              this.errorMessage = 'User ID not found';
              return;
            }
            const data = {
              firstName: this.firstName,
              lastName: this.lastName,
              userName: this.userName,
              email: this.email,
            };

            const docRef = doc(firestoreDB, 'users', userID);

            await setDoc(docRef, data, { merge: true }).then((respone) => {
              this.loading = false;
              this.modalActive = true;
              console.log('Document written with ID: ', respone);
            });
          } catch (error) {
            this.error = true;
            this.loading = false;
            this.errorMessage = error.toString();
            console.error('Error adding document: ', this.errorMessage);
            return;
          }
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              this.errorMessage =
                'Email already in use, Please choose another email';
              break;
            case 'auth/invalid-email':
              this.errorMessage = 'Invalid email';
              break;
            default:
              this.errorMessage = 'Somethings went wrong, Please try again!';
              break;
          }
          this.error = true;
          this.loading = false;
        });
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
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

  .register-form {
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
