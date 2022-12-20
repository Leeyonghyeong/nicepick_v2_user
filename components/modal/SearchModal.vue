<template>
  <section>
    <article class="search-modal-wrapper">
      <div class="search-area-zone">
        <div class="top-search-bar">
          <div class="top-search-wrapper">
            <div class="search-input">
              <img src="~/assets/img/common/search-gray.png" alt="검색" />
              <input
                v-model="keyword"
                type="text"
                placeholder="검색어를 입력하세요"
                @keypress.enter="checkValidateInput"
              />
            </div>
            <div class="close">
              <img
                src="~/assets/img/close/close_black.png"
                alt="close"
                @click="$emit('closeSearchModal')"
              />
            </div>
          </div>
        </div>

        <!-- 최근 검색어 공간 -->
        <!-- 최근 검색어 공간 -->

        <div class="recommend-tag">
          <div>추천 태그</div>
          <div class="tag-items">
            <div v-for="item in currentRank" :key="item.rank" class="item">
              #{{ item.keyword }}
            </div>
          </div>
        </div>

        <CommonBrandRecommendBrandItem background-color="#fff" />
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useKeywordRankStore } from '~~/store/keywordRank'

const emit = defineEmits<{
  (e: 'closeSearchModal'): void
}>()

const keywordRankStore = useKeywordRankStore()
const { currentRank } = storeToRefs(keywordRankStore)

if (currentRank.value.length === 0) {
  keywordRankStore.addKeywordRank()
}

const router = useRouter()
const keyword = ref<string>('')

const checkValidateInput = () => {
  if (keyword.value) {
    emit('closeSearchModal')
    router.push(`/search?keyword=${keyword.value}`)
  } else {
    alert('검색어를 입력해 주세요')
  }
}

onMounted(() => {
  document.body.setAttribute('style', 'overflow: hidden')
})

onUnmounted(() => {
  document.body.removeAttribute('style')
})
</script>

<style lang="scss" scoped>
section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;

  .search-modal-wrapper {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    .search-area-zone {
      background-color: #fff;
      width: 100%;
      height: auto;

      .top-search-bar {
        @include pc-container();

        .top-search-wrapper {
          height: 60px;
          border-bottom: 1px solid $sectionLine;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .search-input {
            padding-left: 20px;
            display: flex;
            align-items: center;

            img {
              width: 30px;
              margin-right: 10px;
            }

            input {
              width: 600px;
            }
          }

          .close {
            img {
              width: 30px;
              cursor: pointer;
            }
          }
        }
      }

      // 최근 검색어 공간
      // 최근 검색어 공간

      .recommend-tag {
        @include pc-container();
        margin-top: 30px;
        color: $fontMainColor;

        .tag-items {
          display: flex;
          margin-top: 20px;
          flex-wrap: wrap;

          .item {
            font-size: 14px;
            color: $fontMainColor;
            padding: 10px 16px;
            background-color: #fafafa;
            border-radius: 50px;
            cursor: pointer;
            margin-right: 8px;
          }
        }
      }
    }
  }
}

@include tablet {
  section {
    .search-modal-wrapper {
      .search-area-zone {
        .top-search-bar {
          @include tablet-container();
        }

        // 최근 검색어 공간
        // 최근 검색어 공간
        .recommend-tag {
          @include tablet-container();

          .tag-items {
            margin-top: 8px;

            .item {
              margin-top: 12px;
            }
          }
        }
      }
    }
  }
}

@include mobile {
  section {
    .search-modal-wrapper {
      background-color: #fff;

      .search-area-zone {
        .top-search-bar {
          @include mobile-container();
          border-bottom: 1px solid $sectionLine;

          .top-search-wrapper {
            border: none;

            .search-input {
              padding: 0;

              input {
                width: calc(100vw / 2);
              }
            }
          }
        }

        // 최근 검색어 공간
        // 최근 검색어 공간

        .recommend-tag {
          @include mobile-container();

          .tag-items {
            margin-top: 10px;

            .item {
              margin-top: 12px;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>
