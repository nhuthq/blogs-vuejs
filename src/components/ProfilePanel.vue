<template>
  <div class="profile-panel-container">
    <div class="info">
      <p class="initials">{{ this.$store.state.profileInitials }}</p>
      <div class="right">
        <p>
          {{ this.$store.state.profileFirstName }}
          {{ this.$store.state.profileLastName }}
        </p>
        <p>
          {{ this.$store.state.profileUserName }}
          {{ this.$store.state.profileEmail }}
        </p>
      </div>
    </div>
    <div class="options">
      <div class="option">
        <RouterLink class="option" :to="{ name: '' }">
          <UserIcon class="icon" />
          <p>Profile</p>
        </RouterLink>
      </div>
      <div class="option">
        <RouterLink v-show="isAdmin" class="option" :to="{ name: '' }">
          <AdminIcon class="icon" />
          <p>Admin</p>
        </RouterLink>
      </div>
      <div class="option">
        <RouterLink @click="signOut" class="option" to="/">
          <SignOutIcon class="icon" />
          <p>Sign Out</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { firebaseAuth } from '@/services/firebase/firebaseInit';

import UserIcon from '@/assets/Icons/user-alt-light.svg';
import AdminIcon from '@/assets/Icons/user-crown-light.svg';
import SignOutIcon from '@/assets/Icons/sign-out-alt-regular.svg';
export default {
  name: 'ProfilePanel',
  components: {
    UserIcon,
    AdminIcon,
    SignOutIcon,
    RouterLink,
  },
  computed: {
    isAdmin() {
      return this.$store.state.profileAdmin;
    },
  },
  methods: {
    signOut() {
      firebaseAuth.signOut();
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-panel-container {
  position: absolute;
  top: 60px;
  right: 0;
  max-width: 280px;
  background-color: #303030;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .info {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid white;

    .initials {
      position: initial;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #303030;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right {
      flex: 1;
      margin-left: 24px;

      p:nth-child(1) {
        font-size: 14px;
      }
      p:nth-child(2) {
        font-size: 14px;
      }
    }
  }

  .options {
    padding: 15px;
    .option {
      text-decoration: none;
      color: white;
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .icon {
        width: 18px;
        height: auto;
      }

      p {
        font-size: 14px;
        margin-left: 12px;
      }

      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
}
</style>
