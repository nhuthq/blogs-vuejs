<template>
  <header>
    <nav class="container">
      <div class="branding">
        <RouterLink :to="{ name: 'Home' }" class="header">
          VeNtura Blogs
        </RouterLink>
      </div>
      <div class="nav-links" v-if="isPCView">
        <ul>
          <RouterLink class="link" to="/">Home</RouterLink>
          <RouterLink class="link" to="/blogs">Blogs</RouterLink>
          <RouterLink v-show="isAdmin" class="link" to="#"
            >Create Blogs</RouterLink
          >
          <RouterLink v-show="!user" class="link" to="/login">Login</RouterLink>
        </ul>
        <div
          v-show="user"
          class="profile-button"
          @click="toggleProfileMenu"
          ref="profile"
        >
          <span>{{ this.$store.state.profileInitials }}</span>
          <div v-show="toggleProfile">
            <ProfilePanel />
          </div>
        </div>
      </div>
    </nav>
    <MenuIcon @click="toggleSPNav" class="menu-icon" v-if="isSPView" />
    <Transition
      :class="{ 'slide-out': !isOpenSPNav }"
      class="mobile-nav"
      v-show="isOpenSPNav"
    >
      <ul class="mobile-nav">
        <RouterLink class="link" to="/">Home</RouterLink>
        <RouterLink class="link" to="/blogs">Blogs</RouterLink>
        <RouterLink v-show="isAdmin" class="link" to="#"
          >Create Blogs</RouterLink
        >
        <RouterLink v-show="!user" class="link" to="/login">Login</RouterLink>
      </ul>
    </Transition>
  </header>
</template>

<script>
import ProfilePanel from './ProfilePanel.vue';
import MenuIcon from '@/assets/Icons/bars-regular.svg';

import { getDeviceViewSmart } from '../helpers/deviceView';
export default {
  name: 'Navigation',
  components: {
    MenuIcon,
    ProfilePanel,
  },
  data() {
    return {
      device: {
        type: null, // 'PCView' | 'SPView' | 'AppView'
        windowWidth: null,
      },
      isOpenSPNav: false,
      toggleProfile: false,
    };
  },
  computed: {
    isPCView() {
      return this.device.type === 'PCView';
    },
    isSPView() {
      return this.device.type === 'SPView' || this.device.type === 'TabletView';
    },
    isAppView() {
      return this.device.type === 'AppView';
    },
    user() {
      return this.$store.state.user;
    },
    isAdmin() {
      return this.$store.state.profileAdmin;
    },
  },
  created() {
    this.checkScreen();
    window.addEventListener('resize', this.checkScreen);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreen);
  },
  methods: {
    checkScreen() {
      const width = window.innerWidth;
      const type = getDeviceViewSmart(width);

      this.device = {
        type,
        windowWidth: width,
      };
      this.windowWidth = window.innerWidth;
    },
    toggleSPNav() {
      this.isOpenSPNav = !this.isOpenSPNav;
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.toggleProfile = !this.toggleProfile;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: white;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: black;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      width: 100%;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;
        }

        .link:last-child {
          margin-right: 0;
        }
      }

      .profile-button {
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: white;
        background-color: #303030;

        span {
          pointer-events: none;
        }
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    top: 32px;
    right: 25px;
    height: 25px;
    width: 25px;
    position: absolute;
    align-items: center;
    justify-content: center;
  }

  .mobile-nav {
    top: 0;
    left: 0;
    height: 100%;
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    position: fixed;
    flex-direction: column;
    background-color: #303030;
    transform: translateX(-100%);
    animation: slideIn 0.3s ease forwards;

    .link {
      padding: 15px 0;
      color: white;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
  .slide-out {
    animation: slideOut 0.3s ease-in-out forwards;
  }
}
</style>
