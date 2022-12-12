<template>
  <section>
    <article>
      <div class="swiper-banner">
        <Swiper
          :modules="[Navigation]"
          :slides-per-view="1"
          :space-between="
            getDevice === 'pc' ? 30 : getDevice === 'tablet' ? 24 : 8
          "
          :loop="true"
          :loop-additional-slides="1"
          :navigation="{
            prevEl: '.custom-button-prev',
            nextEl: '.custom-button-next',
          }"
        >
          <SwiperSlide>
            <img
              v-if="getDevice === 'pc'"
              src="~/assets/img/banner/banner1_pc.png"
              alt="banner1"
            />
            <img
              v-else-if="getDevice === 'tablet'"
              src="~/assets/img/banner/banner1_tab.png"
              alt="banner1"
            />
            <img v-else src="~/assets/img/banner/banner1_m.png" alt="banner1" />
          </SwiperSlide>
          <SwiperSlide>
            <img
              v-if="getDevice === 'pc'"
              src="~/assets/img/banner/banner2_pc.png"
              alt="banner2"
            />
            <img
              v-else-if="getDevice === 'tablet'"
              src="~/assets/img/banner/banner2_tab.png"
              alt="banner2"
            />
            <img v-else src="~/assets/img/banner/banner2_m.png" alt="banner2" />
          </SwiperSlide>
          <SwiperSlide>
            <img
              v-if="getDevice === 'pc'"
              src="~/assets/img/banner/banner3_pc.png"
              alt="banner3"
            />
            <img
              v-else-if="getDevice === 'tablet'"
              src="~/assets/img/banner/banner3_tab.png"
              alt="banner3"
            />
            <img v-else src="~/assets/img/banner/banner3_m.png" alt="banner3" />
          </SwiperSlide>
          <SwiperSlide>
            <img
              v-if="getDevice === 'pc'"
              src="~/assets/img/banner/banner4_pc.png"
              alt="banner4"
            />
            <img
              v-else-if="getDevice === 'tablet'"
              src="~/assets/img/banner/banner4_tab.png"
              alt="banner4"
            />
            <img v-else src="~/assets/img/banner/banner4_m.png" alt="banner4" />
          </SwiperSlide>
        </Swiper>

        <div class="custom-button-prev">
          <img src="~/assets/img/banner/banner-prev.png" alt="prev" />
        </div>
        <div class="custom-button-next">
          <img src="~/assets/img/banner/banner-next.png" alt="next" />
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import 'swiper/scss'
import 'swiper/css/navigation'
import { storeToRefs } from 'pinia'
import { useWindowStore } from '~/store/window'

const windowStore = useWindowStore()
const { getDevice } = storeToRefs(windowStore)
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;

  article {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;

    .swiper-banner {
      width: 1194px;
      position: relative;

      img {
        width: 100%;
      }

      .custom-button-prev,
      .custom-button-next {
        position: absolute;
        width: 50px;
        height: 50px;
        z-index: 2;
        cursor: pointer;

        img {
          width: 50px;
          height: 50px;
        }

        &.custom-button-prev {
          top: 75px;
          left: -110px;
        }

        &.custom-button-next {
          top: 75px;
          right: -110px;
        }
      }
    }
  }

  @include tablet {
    article {
      @include tablet-container();

      .swiper-banner {
        width: 100%;

        img {
          width: 100%;
        }
      }
    }
  }

  @include mobile {
    article {
      @include mobile-container();

      .swiper-banner {
        width: 100%;

        img {
          width: 100%;
        }
      }
    }
  }
}

:global(.swiper) {
  overflow: visible;
}
</style>
