<template>
  <footer>
    <div class="container">
      <div class="left-container">
        <div class="socials">
          <RouterLink class="branding" :to="'/'">VeNtura Blogs</RouterLink>
          <ul>
            <li>
              <RouterLink :to="'/'"><youtube class="svg-icon" /></RouterLink>
            </li>
            <li>
              <RouterLink :to="'/'"><twitter class="svg-icon" /></RouterLink>
            </li>
            <li>
              <RouterLink :to="'/'"><linkedin class="svg-icon" /></RouterLink>
            </li>
            <li>
              <RouterLink :to="'/'"><instagram class="svg-icon" /></RouterLink>
            </li>
          </ul>
        </div>
        <div class="links">
          <ul>
            <li>
              <RouterLink :to="{ name: 'Home' }" class="link">Home</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'Home' }" class="link">Blogs</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: '' }" class="link"
                >Create Blogs</RouterLink
              >
            </li>
            <li>
              <RouterLink :to="{ name: '' }" class="link"
                >Login/Register</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="right-container">
        <p>VeNtura Blogs Copyright 2025 All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import youtube from '../assets/Icons/youtube-brands.svg';
import twitter from '../assets/Icons/twitter-brands.svg';
import linkedin from '../assets/Icons/linkedin-brands.svg';
import instagram from '../assets/Icons/instagram-brands.svg';

export default {
  name: 'Footer',
  components: {
    youtube,
    twitter,
    linkedin,
    instagram,
  },
};
</script>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    @media screen and (min-width: 800px) {
      flex-direction: row;
      gap: 0;
    }

    .left-container {
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 52px;
      @media screen and (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
      }

      .branding {
        text-align: center;
        font-size: 24px;
        color: white;
        margin-bottom: 16px;
        text-decoration: none;
        white-space: nowrap;
        font-weight: 600;
        @media (min-width: 800px) {
          text-align: initial;
        }
      }

      ul {
        gap: 16px;
        list-style: none;
        display: flex;
      }

      .socials,
      .links {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (min-width: 800px) {
          gap: 0;
        }
      }

      .socials {
        flex-direction: column;

        ul {
          margin-top: auto;
          li {
            display: flex;
            align-items: center;
            .svg-icon {
              width: 24px;
              height: auto;
              color: white;
            }
          }
        }
      }

      .links {
        ul {
          flex-wrap: wrap;
          flex-direction: row;
          justify-content: center;
          @media (min-width: 800px) {
            flex-direction: column;
          }
        }
        .link {
          font-size: 16;
          font-weight: 500;
          color: white;
          white-space: nowrap;
          text-decoration: none;
        }
      }
    }

    .right-container {
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (min-width: 800px) {
        align-items: flex-end;
      }

      p {
        margin-top: auto;
        text-align: center;
      }
    }
  }
}
</style>
