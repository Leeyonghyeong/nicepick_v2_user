<template>
  <section :style="{ width }">
    <article :style="{ height }">
      <div class="ad-wrapper" :style="{ backgroundColor }">
        <div class="ad">AD</div>
        <div class="ad-text">
          <h1>스타벅스 커피는 맛있어요</h1>
          <h6>신메뉴가 먹고싶어요</h6>
        </div>
        <div class="ad-image">
          <img src="~/assets/img/AD/ad_image.png" alt="AD" />
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  width?: string | number
  height?: string | number
  backgroundColor?: string
}>()
</script>

<style lang="scss" scoped>
section {
  article {
    @include pc-container();
    height: 100px;
    .ad-wrapper {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 0 10%;
      color: #fff;
      height: 100%;
      background-color: #4c7eca;

      border-radius: 10px;

      .ad-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        line-height: 24px;

        h1 {
          font-size: 20px;
          font-weight: 600;
        }

        h6 {
          font-weight: 400;
        }
      }

      .ad-image {
        img {
          width: 140px;
        }
      }

      .ad {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 18px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        font-size: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  @include tablet {
    article {
      @include tablet-container();
    }
  }

  @include mobile {
    article {
      width: 100%;

      .ad-wrapper {
        border-radius: 0;

        .ad-text {
          h1 {
            font-size: 15px;
          }

          h6 {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
