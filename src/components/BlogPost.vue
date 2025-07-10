<template>
  <div class="blog-post-container" :class="{ 'no-user': !user }">
    <div class="blog-content">
      <div>
        <h2>
          {{ blogPost.title }}
        </h2>
        <p v-if="blogPost.welcomeScreen">{{ blogPost.content }}</p>
        <p v-else class="content-preview">{{ blogPost.content }}</p>
        <RouterLink
          v-if="blogPost.welcomeScreen"
          v-show="!user"
          class="link link-light"
          to="/login"
        >
          Login/register <IcArrow class="arrow arrow-light" />
        </RouterLink>
        <RounterLink v-else class="link" to="#">
          View The Post <IcArrow class="arrow" />
        </RounterLink>
      </div>
    </div>
    <div class="blog-photo">
      <img
        :src="getImage(blogPost.coverPhoto)"
        :alt="blogPost.coverPhotoName"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Blog } from '../models/Blog';
import { RouterLink } from 'vue-router';
import imgCoffee from '@/assets/thumbnail/coffee.jpg';
import imgCoding from '@/assets/thumbnail/coding.jpg';
import imgCodingNight from '@/assets/thumbnail/codingnight.jpg';
import imgPhotographer from '@/assets/thumbnail/photographer.jpg';

import IcArrow from '@/assets/Icons/arrow-right-light.svg';

export default {
  name: 'BlogPost',
  props: {
    blogPost: {
      type: Object as () => Blog,
      required: true,
      validator: (obj: Blog) => {
        return typeof obj.id === 'string' && typeof obj.title === 'string';
      },
    },
  },
  components: {
    IcArrow,
    RouterLink,
  },
  methods: {
    getImage(imageName: string) {
      const mockImages = [
        { name: 'coding', value: imgCoding },
        { name: 'coffee', value: imgCoffee },
        { name: 'codingnight', value: imgCodingNight },
        { name: 'photographer', value: imgPhotographer },
      ];
      const found = mockImages.find((img) => img.name === imageName);
      return found ? found.value : imgCoding; // default fallback
    },
  },
  setup() {
    const store = useStore();

    const user = computed(() => store.state.user);

    return {
      user,
    };
  },
};
</script>

<style lang="scss" scoped>
.blog-post-container {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }
  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      @media (min-width: 700px) {
        padding: 0 24px;
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

      .content-preview {
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
        border-bottom: 1px solid transparent;

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
  w &:nth-child(even) {
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
