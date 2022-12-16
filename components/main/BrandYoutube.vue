<template>
  <section>
    <article>
      <div class="title">영상으로 즐기는 브랜드 HOT클립</div>
      <div class="youtube-container">
        <div class="youtube-video">
          <iframe
            :src="`https://www.youtube.com/embed/${currentYoutube?.brandYoutube[0].youtubeId}?autoplay=1&mute=1&controls=0`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div class="right-youtube-title">
            {{ currentYoutube?.brandYoutube[0].youtubeTitle }}
          </div>
          <div class="right-brand-logo-name">
            <img
              :src="currentYoutube?.brandLogoImg"
              :alt="currentYoutube?.brandName"
            />
            {{ currentYoutube?.brandName }}
          </div>
        </div>
        <div class="youtube-thumbnail-list">
          <div class="youtube-thumbnail-list-items">
            <div
              v-for="item in shuffleItems"
              :key="item.id"
              class="item"
              :class="{
                active:
                  currentYoutube?.brandYoutube[0].youtubeId ===
                  item.brandYoutube[0].youtubeId,
              }"
              @click="changeCurrentYoutube(item)"
            >
              <div class="youtube-thumbnail">
                <img
                  :src="`https://img.youtube.com/vi/${item.brandYoutube[0].youtubeId}/mqdefault.jpg`"
                  :alt="item.brandName"
                />

                <img
                  v-if="
                    currentYoutube?.brandYoutube[0].youtubeId ===
                    item.brandYoutube[0].youtubeId
                  "
                  src="~/assets/img/arrow/play.png"
                  alt="play"
                  class="play"
                />
              </div>
              <div class="brand-youtube-info">
                <div class="youtube-title">
                  {{
                    item.brandYoutube[0].youtubeTitle
                      ? item.brandYoutube[0].youtubeTitle
                      : ''
                  }}
                </div>
                <div class="brand-name">{{ item.brandName }}</div>
              </div>
            </div>
          </div>
          <div class="re-load">
            <CommonButtonNextPageLoad
              title="HOT클립 더보기"
              :page="page"
              :total-count="totalCount"
              :page-num="pageNum"
              @click="nextYoutubePage"
            />
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import axios from 'axios'
import api from '~/config/axios.config'
import { Brand, BrandYoutube } from '~/types/brand'
import { calcTotalPage } from '~~/function/common'

const brandItems = ref<Brand[]>([])
const shuffleItems = ref<Brand[]>([])
const currentYoutube = ref<Brand>()
const page = ref<number>(1)
const totalCount = ref<number>(0)
const pageNum = 3

const getBrandItems = async () => {
  const { data } = await api.get('/brand/search/main/youtube')

  if (data.success) {
    brandItems.value = data.brand.sort(() => Math.random() - 0.5)
    shuffleItems.value = brandItems.value.slice(
      (page.value - 1) * pageNum,
      pageNum * page.value
    )

    shuffleItems.value.forEach((e) => getYoutubeTitle(e.brandYoutube[0]))
    currentYoutube.value = shuffleItems.value[0]
    totalCount.value = brandItems.value.length
  } else {
    alert('브랜드 핫클립 요청 실패')
  }
}

const getYoutubeTitle = async (youtube: BrandYoutube) => {
  const noEmbed = 'https://noembed.com/embed?url='
  const url = `https://www.youtube.com/watch?v=${youtube.youtubeId}`

  const { data } = await axios.get(noEmbed + url)

  youtube.youtubeTitle = data.title
}

const changeCurrentYoutube = (item: Brand) => {
  currentYoutube.value = item
}

const nextYoutubePage = () => {
  if (calcTotalPage(totalCount.value, pageNum) <= page.value) {
    page.value = 1
  } else {
    page.value++
  }

  shuffleItems.value = brandItems.value.slice(
    (page.value - 1) * pageNum,
    pageNum * page.value
  )

  shuffleItems.value.forEach((e) => getYoutubeTitle(e.brandYoutube[0]))
  currentYoutube.value = shuffleItems.value[0]
}

getBrandItems()
</script>

<style lang="scss" scoped>
section {
  background-color: #f8f8f8;
  height: 650px;
  padding-top: 60px;
  margin-bottom: 80px;

  article {
    @include pc-container();

    .title {
      font-size: 18px;
      color: $fontMainColor;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .youtube-container {
      display: flex;

      .youtube-video {
        width: 684px;

        iframe {
          width: 684px;
          height: 393px;
        }

        .right-youtube-title {
          margin-top: 13px;
          line-height: 24px;
          color: $fontMainColor;
        }

        .right-brand-logo-name {
          margin-top: 8px;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $fontSubColor;

          img {
            width: 72px;
            height: 30px;
            margin-right: 10px;
          }
        }
      }
      .youtube-thumbnail-list {
        display: flex;
        flex-direction: column;
        margin-left: 30px;
        flex: 1;

        .youtube-thumbnail-list-items {
          display: flex;
          flex-direction: column;

          .item {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            cursor: pointer;
            padding-right: 10px;

            &.active {
              background-color: #ebebeb;
              border-radius: 10px;
            }

            .youtube-thumbnail {
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;

              img {
                width: 174px;
                height: 100px;
                border-radius: 10px;

                &.play {
                  position: absolute;
                  width: 30px;
                  height: 30px;
                }
              }
            }

            .brand-youtube-info {
              color: $fontMainColor;
              padding-left: 10px;

              .youtube-title {
                line-height: 24px;
                white-space: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                word-wrap: break-word;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }

              .brand-name {
                color: $fontSubColor;
                font-size: 14px;
                margin-top: 6px;
              }
            }
          }
        }

        .re-load {
          margin-top: 4px;
        }
      }
    }
  }
}

@include tablet {
  section {
    padding-top: 43px;
    padding-bottom: 43px;
    margin-bottom: 50px;
    height: auto;

    article {
      @include tablet-container();

      .youtube-container {
        .youtube-video {
          width: 328px;

          iframe {
            width: 328px;
            height: 189px;
          }

          .right-youtube-title {
            margin-top: 17px;
          }

          .right-brand-logo-name {
            margin-top: 6px;
          }
        }

        .youtube-thumbnail-list {
          margin-left: 24px;

          .youtube-thumbnail-list-items {
            .item {
              img {
                width: 152px;
                height: 87px;
              }

              .brand-youtube-info {
                .youtube-title {
                  font-size: 14px;
                }

                .brand-name {
                  font-size: 13px;
                }
              }
            }
          }
        }
      }
    }
  }
}

@include mobile {
  section {
    height: auto;
    padding-top: 30px;
    margin-bottom: 0;

    article {
      @include mobile-container();

      .title {
        font-size: 16px;
      }
      .youtube-container {
        flex-direction: column;
        .youtube-video {
          width: 100%;
          margin-bottom: 30px;

          iframe {
            width: 100%;
            height: 200px;
          }

          .right-youtube-title {
            margin-top: 10px;
            font-size: 13px;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .right-brand-logo-name {
            margin-top: 8px;
            font-size: 11px;
          }
        }

        .youtube-thumbnail-list {
          margin-left: 0;
          padding-bottom: 30px;

          .youtube-thumbnail-list-items {
            .item {
              margin-bottom: 8px;
              img {
                width: 160px;
                height: 92px;
              }

              .brand-youtube-info {
                padding-left: 8px;
                .youtube-title {
                  font-size: 14px;
                }

                .brand-name {
                  font-size: 13px;
                }
              }
            }
          }

          .re-load {
            margin-top: 12px;
          }
        }
      }
    }
  }
}
</style>
