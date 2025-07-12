<script>
import Footer from './components/Footer.vue';
import Navigation from './components/Navigation.vue';

import { firebaseAuth } from '@/services/firebase/firebaseInit.js';

export default {
  name: 'App',
  components: {
    Footer,
    Navigation,
  },
  data() {
    return {
      navigation: null,
    };
  },
  computed: {
    blogsFetched() {
      return this.$store.state.blogsFetched;
    },
  },
  methods: {
    checkRoute() {
      if (
        this.$route.name === 'Login' ||
        this.$route.name === 'Register' ||
        this.$route.name === 'ForgotPassword'
      ) {
        this.navigation = false;
        return;
      }
      this.navigation = true;
    },
  },
  created() {
    this.checkRoute();
    this.$store.dispatch('getBlogs');
    firebaseAuth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        this.$store.commit('updateUser', currentUser);
        this.$store.dispatch('getCurrentUser');
      }
    });
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<template>
  <div class="app-wrapper" v-if="blogsFetched">
    <div class="app">
      <Navigation v-if="navigation" />
      <RouterView />
      <Footer v-if="navigation" />
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 320px;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: black;
  }
}
.arrow-light {
  path {
    fill: white;
  }
}

button,
.router-button {
  transform: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: white;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: navajowhite;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}
</style>
