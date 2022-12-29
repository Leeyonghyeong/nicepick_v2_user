<template>
  <section>
    <div class="top-noti">
      <div>해당 브랜드 본사에서 직접 작성한 정보입니다.</div>
      <div>
        변경된 사항이 있을 수 있으니 자세한 사항은 해당 브랜드 본사와 직접 상담
        부탁드립니다.
      </div>
    </div>

    <!-- 소개 이미지 -->
    <div v-if="brandIntroImg.length > 0" class="intro-image">
      <div class="image-wrapper">
        <div
          v-for="item in brandIntroImg.sort((a, b) =>
            a.createAt < b.createAt ? -1 : 0
          )"
          :key="item.id"
          class="item"
        >
          <img :src="item.introImgUrl" :alt="brandIntroItem.brandName" />
        </div>
      </div>
    </div>
    <!-- 소개 이미지 -->

    <!-- 유튜브 영상 -->
    <div v-if="brandYoutube.length > 0" class="youtube info-item">
      <div class="title">Youtube 영상</div>

      <div class="current-youtube">
        <iframe
          :src="`https://www.youtube.com/embed/${currentYoutube.youtubeId}?autoplay=0&mute=0&controls=0`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <div
        v-if="brandYoutube.length > 1"
        ref="youtubeList"
        class="youtube-list"
        @mousedown="youtubeListScrollStartHandler"
        @mouseleave="youtubeListScrollEndHandler"
        @mouseup="youtubeListScrollEndHandler"
      >
        <div
          v-for="item in brandYoutube"
          :key="item.id"
          class="item"
          @click="changeCurrentYoutube(item)"
        >
          <img
            :src="`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`"
            :alt="brandIntroItem.brandName"
          />
        </div>
        <div
          v-if="isYoutubeListScroll"
          ref="scrollCover"
          class="scroll-cover"
          :style="`width: ${youtubeList?.scrollWidth}px`"
        ></div>
      </div>
    </div>
    <!-- 유튜브 영상 -->

    <!-- 대표메뉴 -->
    <div v-if="brandMenuImg.length > 0" class="brand-menu info-item">
      <div class="title">
        <div>대표메뉴</div>
        <div v-if="getDevice !== 'mobile'" class="page-button">
          <img
            src="~/assets/img/arrow/page_button_left.png"
            alt="prev"
            @click="brandMenuListPageHandler('-')"
          />
          <img
            src="~/assets/img/arrow/page_button_right.png"
            alt="next"
            @click="brandMenuListPageHandler('+')"
          />
        </div>
      </div>

      <div ref="brandMenuList" class="brand-menu-list">
        <div v-for="item in brandMenuImg" :key="item.id" class="item">
          <div class="menu-image">
            <img
              :src="item.menuImgUrl"
              :alt="item.menuName ? item.menuName : brandIntroItem.brandName"
            />
          </div>
          <div v-if="item.menuName || item.menuPrice" class="menu-info">
            <div v-if="item.menuName">{{ item.menuName }}</div>
            <div v-if="item.menuPrice">
              {{ item.menuPrice.toLocaleString() }}원
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 대표메뉴 -->

    <!-- 시설 및 인테리어 -->
    <div v-if="brandInteriorImg.length > 0" class="brand-interior info-item">
      <div class="title">
        <div>시설 및 인테리어</div>
        <div class="page-button">
          <img
            src="~/assets/img/arrow/page_button_left.png"
            alt="prev"
            @click="brandInteriorListPageHandler('-')"
          />
          <img
            src="~/assets/img/arrow/page_button_right.png"
            alt="next"
            @click="brandInteriorListPageHandler('+')"
          />
        </div>
      </div>

      <div ref="brandInteriorList" class="brand-interior-list">
        <div v-for="item in brandInteriorImg" :key="item.id" class="item">
          <div class="interior-image">
            <img :src="item.interiorImgUrl" :alt="brandIntroItem.brandName" />
          </div>
        </div>
      </div>

      <div class="page-info">
        {{ interiorPageNumber }} / {{ brandInteriorImg.length }}
      </div>
    </div>
    <!-- 시설 및 인테리어 -->

    <!-- 창업 비용 및 절차 -->
    <div v-if="brandStartCostImg.length > 0" class="brand-start-cost info-item">
      <div class="title">창업 비용 및 절차</div>
      <div class="brand-start-cost-list">
        <div v-for="item in brandStartCostImg" :key="item.id" class="item">
          <img :src="item.startCostImgUrl" :alt="brandIntroItem.brandName" />
        </div>
      </div>
    </div>
    <!-- 창업 비용 및 절차 -->
  </section>
</template>

<script lang="ts" setup>
import {
  Brand,
  BrandIntroImg,
  BrandYoutube,
  BrandMenuImg,
  BrandInteriorImg,
  BrandStartCostImg,
} from '~~/types/brand'

const prop = defineProps<{
  brandIntroItem: Brand
  getDevice: string
}>()

// 소개 이미지
const brandIntroImg = ref<BrandIntroImg[]>(prop.brandIntroItem.brandIntroImg)
// 소개 이미지

// 유튜브 영상
const brandYoutube = ref<BrandYoutube[]>(prop.brandIntroItem.brandYoutube)
const currentYoutube = ref<BrandYoutube>(brandYoutube.value[0])
const youtubeList = ref<HTMLDivElement | null>(null)
const isYoutubeListScroll = ref<boolean>(false)
const startX = ref<number>(0)
const scrollLeft = ref<number>(0)
const scrollCover = ref<HTMLDivElement | null>(null)

const youtubeListScrollStartHandler = (e: MouseEvent) => {
  if (youtubeList.value) {
    startX.value = e.pageX - youtubeList.value.offsetLeft
    scrollLeft.value = youtubeList.value.scrollLeft
    youtubeList.value.addEventListener('mousemove', youtubeListScrollHandler)
  }
}

const youtubeListScrollEndHandler = () => {
  if (youtubeList.value) {
    isYoutubeListScroll.value = false
    youtubeList.value.removeEventListener('mousemove', youtubeListScrollHandler)
  }
}

const youtubeListScrollHandler = (e: MouseEvent) => {
  if (youtubeList.value) {
    isYoutubeListScroll.value = true
    const x = e.pageX - youtubeList.value.offsetLeft
    const scroll = (x - startX.value) * 1
    const scrollPosition = scrollLeft.value - scroll
    youtubeList.value.scrollLeft = scrollPosition
  }
}

const changeCurrentYoutube = (item: BrandYoutube) => {
  currentYoutube.value = item
}
// 유튜브 영상

// 대표메뉴
const brandMenuImg = ref<BrandMenuImg[]>(prop.brandIntroItem.brandMenuImg)
const brandMenuList = ref<HTMLDivElement | null>(null)
const itemMargin = computed<number>(() => {
  return prop.getDevice === 'pc' ? 30 : 24
})

const brandMenuListPageHandler = (type: string) => {
  if (brandMenuList.value) {
    const item = brandMenuList.value.getElementsByClassName('item')[0]

    if (type === '+') {
      brandMenuList.value.scrollLeft +=
        item.getBoundingClientRect().width + itemMargin.value
    } else {
      brandMenuList.value.scrollLeft -=
        item.getBoundingClientRect().width + itemMargin.value
    }
  }
}
// 대표메뉴

// 시설 및 인테리어
const brandInteriorImg = ref<BrandInteriorImg[]>(
  prop.brandIntroItem.brandInteriorImg
)
const brandInteriorList = ref<HTMLDivElement | null>(null)
const interiorPageNumber = ref<number>(1)

const brandInteriorListPageHandler = (type: string) => {
  if (brandInteriorList.value) {
    const item = brandInteriorList.value.getElementsByClassName('item')[0]

    if (type === '+') {
      brandInteriorList.value.scrollLeft += item.getBoundingClientRect().width
      if (brandInteriorImg.value.length > interiorPageNumber.value) {
        interiorPageNumber.value += 1
      }
    } else {
      brandInteriorList.value.scrollLeft -= item.getBoundingClientRect().width
      if (interiorPageNumber.value > 1) {
        interiorPageNumber.value -= 1
      }
    }
  }
}
// 시설 및 인테리어

// 창업 비용 및 절차
const brandStartCostImg = ref<BrandStartCostImg[]>(
  prop.brandIntroItem.brandStartCostImg
)
// 창업 비용 및 절차
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  .top-noti {
    font-size: 12px;
    color: $fontSubColor;
    line-height: 16px;
    margin-bottom: 30px;
  }

  .intro-image {
    width: 100%;
    margin-bottom: 80px;

    .image-wrapper {
      overflow: hidden;
      border-radius: 10px;
      display: flex;
      flex-direction: column;

      .item {
        height: auto;
        img {
          display: block;
          width: 100%;
        }
      }
    }
  }

  .info-item {
    margin-bottom: 80px;
    width: 100%;
    .title {
      font-size: 18px;
      color: $fontMainColor;
      font-weight: 500;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .page-button {
        display: flex;
        align-items: center;

        img {
          width: 30px;
          margin-left: 12px;
          cursor: pointer;
        }
      }
    }

    &.youtube {
      .current-youtube {
        width: 100%;

        iframe {
          border-radius: 10px;
          width: 100%;
          aspect-ratio: 1.8;
        }
      }

      .youtube-list {
        margin-top: 20px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        cursor: grab;
        position: relative;

        .scroll-cover {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
        }

        .item {
          display: inline-block;
          width: 204px;
          height: 115px;
          border-radius: 10px;
          overflow: hidden;
          margin-left: 20px;
          cursor: pointer;

          &:first-child {
            margin-left: 0;
          }

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    &.brand-menu {
      .brand-menu-list {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;

        .item {
          margin-left: 30px;
          display: inline-block;

          &:first-child {
            margin-left: 0;
          }

          .menu-image {
            border-radius: 10px;
            overflow: hidden;

            img {
              display: block;
              width: 174px;
              height: 174px;
              cursor: pointer;
            }
          }

          .menu-info {
            margin-top: 10px;
            font-size: 14px;

            div {
              color: $fontMainColor;
              line-height: 17px;
              text-align: center;

              &:last-child {
                margin-top: 7px;
                color: $fontSubColor;
              }
            }
          }
        }
      }
    }

    &.brand-interior {
      position: relative;

      .brand-interior-list {
        overflow: hidden;
        white-space: nowrap;

        .item {
          display: inline-block;

          .interior-image {
            border-radius: 10px;
            overflow: hidden;
            img {
              display: block;
              width: 786px;
              height: 442px;
            }
          }
        }
      }

      .page-info {
        position: absolute;
        bottom: 14px;
        right: 14px;
        color: #fff;
        border-radius: 50px;
        height: 28px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 500;
        background-color: rgba(25, 25, 25, 0.5);
      }
    }

    &.brand-start-cost {
      .brand-start-cost-list {
        border-radius: 10px;
        overflow: hidden;

        .item {
          img {
            width: 100%;
            display: block;
          }
        }
      }
    }
  }

  @include tablet {
    .top-noti {
      @include tablet-container();
    }

    .intro-image {
      @include tablet-container();
    }

    .info-item {
      @include tablet-container();

      &.youtube {
        width: 100%;
        padding: 0;

        .title {
          @include tablet-container();
        }

        .current-youtube {
          @include tablet-container();
        }

        .youtube-list {
          @include tablet-container();
          overflow-x: auto;

          .item {
            width: 160px;
            height: 90px;
          }
        }
      }

      &.brand-menu {
        .brand-menu-list {
          overflow: hidden;

          .item {
            margin-left: 0;
            margin-right: 24px;
            width: calc((100% - 72px) / 4);

            &:last-child {
              margin-right: 0;
            }

            .menu-image {
              img {
                width: 100%;
                height: auto;
                aspect-ratio: 1;
              }
            }
          }
        }
      }

      &.brand-interior {
        .brand-interior-list {
          overflow: hidden;
          .item {
            width: 100%;
            .interior-image {
              img {
                width: 100%;
                height: auto;
                aspect-ratio: 1.77;
              }
            }
          }
        }

        .page-info {
          right: 58px;
        }
      }
    }
  }

  @include mobile {
    .top-noti {
      @include mobile-container();
    }

    .intro-image {
      @include mobile-container();
      margin-bottom: 50px;
    }

    .info-item {
      margin-bottom: 50px;
      @include mobile-container();

      .title {
        font-size: 16px;
      }

      &.youtube {
        width: 100%;
        padding: 0;

        .title {
          @include mobile-container();
        }

        .current-youtube {
          @include mobile-container();
        }

        .youtube-list {
          @include mobile-container();
          overflow-x: auto;

          .item {
            width: 160px;
            height: 90px;
            margin-left: 8px;
          }
        }
      }

      &.brand-menu {
        width: 100%;
        padding: 0;

        .title {
          @include mobile-container();
        }

        .brand-menu-list {
          @include mobile-container();
          overflow-x: auto;

          .item {
            margin-left: 8px;

            .menu-image {
              img {
                width: 104px;
                aspect-ratio: 1;
                height: auto;
              }
            }

            .menu-info {
              font-size: 13px;

              div {
                line-height: 16px;
              }
            }
          }
        }
      }

      &.brand-interior {
        .title {
          .page-button {
            img {
              width: 20px;
            }
          }
        }

        .brand-interior-list {
          overflow: hidden;

          .item {
            width: 100%;

            .interior-image {
              img {
                width: 100%;
                aspect-ratio: 1.77;
                height: auto;
              }
            }
          }
        }

        .page-info {
          right: 37px;
          width: 50px;
          height: 20px;
          font-size: 11px;
        }
      }
    }
  }
}
</style>
