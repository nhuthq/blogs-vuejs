<template>
  <div class="main-container" :class="{ 'no-user': !user }">
    <div class="content-container">
      <div>
        <h2>
          {{ blog.title }}
        </h2>
        <p v-if="blog.welcomeScreen">{{ blog.htmlContent }}</p>
        <p v-else class="html-content" v-html="blog.htmlContent"></p>
        <RouterLink
          v-if="blog.welcomeScreen"
          v-show="!user"
          class="link"
          :to="{ name: 'Login' }"
        >
          Login/register <IcArrow class="arrow" />
        </RouterLink>
        <RouterLink
          v-else
          class="link"
          :to="{ name: 'BlogDetails', params: { blogId: this.blog.id } }"
        >
          View The Post <IcArrow class="arrow" />
        </RouterLink>
      </div>
    </div>
    <div class="blog-photo">
      <img
        v-if="blog.welcomeScreen"
        :src="getImage(blog.coverPhotoURL)"
        :alt="blog.coverPhotoName"
      />
      <img v-else :src="blog.coverPhotoURL" :alt="blog.coverPhotoName" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router';

import imgCoding from '@/assets/thumbnail/coding.jpg';
import IcArrow from '@/assets/Icons/arrow-right-light.svg';

export default {
  name: 'BlogPost',
  props: ['blog'],
  components: {
    IcArrow,
    RouterLink,
  },
  methods: {
    // viewBlog() {
    //   console.log(this.blog.id);
    //   this.$router.push({
    //     name: 'BlogDetails',
    //     params: { blogId: this.blog.id },
    //   });
    // },
    getImage(imageName) {
      const mockImages = [{ name: 'coding', value: imgCoding }];
      const found = mockImages.find((img) => img.name === imageName);
      return found ? found.value : imgCoding; // default fallback
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media (min-width: 700px) {
    min-height: 650px;
    flex-direction: row;
  }
  .content-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    flex: 4;
    order: 2;
    @media (min-width: 700px) {
      order: 1;
    }
    @media (min-width: 800px) {
      order: 3;
    }

    div {
      max-width: 375px;
      padding: 72px 24px;

      @media (min-width: 1440px) {
        max-width: 575px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media (min-width: 700px) {
          font-size: 40px;
        }
      }

      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.5;
      }

      .html-content {
        font-size: 13px;
        max-height: 24px;
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        color: #303030;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease all;

        &:hover {
          border-bottom-color: #303030;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: white;
        }
      }
    }
  }

  .blog-photo {
    flex: 3;
    order: 1;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    @media (min-width: 700px) {
      order: 2;
    }

    @media (min-width: 800px) {
      order: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  &:nth-child(even) {
    .blog-content {
      order: 2;
    }
    .blog-photo {
      order: 1;
    }
  }
}

.no-user:first-child {
  .blog-content {
    background-color: #303030;
    color: white;
  }
}
</style>
