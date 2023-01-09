<template>
  <section class="share-modal">
    <article class="share-modal-wrapper">
      <div class="share-modal-box">
        <div class="top">
          <div>공유</div>
          <img
            src="~/assets/img/close/close_black.png"
            alt="close"
            @click="closeModalAndHistoryBack"
          />
        </div>

        <div class="share-button">
          <div class="button" @click="kakaoShare">
            <img src="~/assets/img/share/kakao.png" alt="카카오톡" />
            <div>카카오톡</div>
          </div>

          <div class="button" @click="facebookShare">
            <img src="~/assets/img/share/facebook.png" alt="페이스북" />
            <div>페이스북</div>
          </div>

          <div class="button" @click="twitterShare">
            <img src="~/assets/img/share/twitter.png" alt="트위터" />
            <div>트위터</div>
          </div>

          <div class="button" @click="copyShare">
            <img src="~/assets/img/share/copy.png" alt="복사" />
            <div>복사</div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useModalStore } from '~~/store/modal'
import { useWindowStore } from '~~/store/window'
import { Brand } from '~~/types/brand'

const props = defineProps<{
  brand?: Brand
}>()

const modalStore = useModalStore()
const windowStore = useWindowStore()
const { isShareModal } = storeToRefs(modalStore)
const { getDevice } = storeToRefs(windowStore)

const route = useRoute()
const mainDomain = 'http://3.38.51.90'

const closeModal = () => {
  isShareModal.value = false
}

const closeModalAndHistoryBack = () => {
  isShareModal.value = false
  history.back()
}

const kakaoShare = () => {
  closeModalAndHistoryBack()

  const { Kakao } = window

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: document.title,
      description: `창업정보 no.1 플랫폼! 모든브랜드 직접비교`,
      imageUrl: props.brand
        ? props.brand.brandImg
          ? props.brand.brandImg
          : 'https://nicepick.s3.ap-northeast-2.amazonaws.com/brand/brand.png'
        : 'https://nicepick.s3.ap-northeast-2.amazonaws.com/brand/brand.png',
      link: {
        mobileWebUrl: mainDomain + route.fullPath,
        webUrl: mainDomain + route.fullPath,
      },
    },
    buttons: [
      {
        title: '자세히 보기',
        link: {
          mobileWebUrl: mainDomain + route.fullPath,
          webUrl: mainDomain + route.fullPath,
        },
      },
    ],
  })
}

const facebookShare = () => {
  closeModalAndHistoryBack()

  if (getDevice.value === 'pc') {
    window.open(
      `http://www.facebook.com/sharer.php?u=${mainDomain + route.fullPath}`
    )
  } else {
    window.location.href = `http://www.facebook.com/sharer.php?u=${
      mainDomain + route.fullPath
    }`
  }
}

const twitterShare = () => {
  closeModalAndHistoryBack()

  if (getDevice.value === 'pc') {
    window.open(
      `https://twitter.com/intent/tweet?text=${document.title}&url=${
        mainDomain + route.fullPath
      }`
    )
  } else {
    window.location.href = `https://twitter.com/intent/tweet?text=${
      document.title
    }&url=${mainDomain + route.fullPath}`
  }
}

const copyShare = () => {
  const textarea = document.createElement('textarea')
  document.body.appendChild(textarea)
  const url = mainDomain + route.fullPath
  textarea.value = url
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)

  closeModalAndHistoryBack()
}

onMounted(() => {
  document.body.setAttribute('style', 'overflow: hidden;')
  window.history.pushState({ page: 'modal' }, '', '#modal')
  window.addEventListener('popstate', closeModal)
})

onUnmounted(() => {
  document.body.removeAttribute('style')
  window.removeEventListener('popstate', closeModal)
})
</script>

<style lang="scss" scoped>
.share-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 102;
  background-color: rgba(0, 0, 0, 0.6);

  .share-modal-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .share-modal-box {
      background-color: #fff;
      border-radius: 10px;
      border: 1px solid $sectionLine;
      width: 378px;
      height: 200px;

      .top {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 50px;
        border-bottom: 1px solid $sectionLine;
        font-size: 16px;
        font-weight: 500;
        color: $fontMainColor;

        img {
          position: absolute;
          width: 30px;
          cursor: pointer;
          right: 10px;
        }
      }

      .share-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;
        .button {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 20px;

          &:first-child {
            margin-left: 0;
          }

          img {
            display: block;
          }

          div {
            font-size: 12px;
            margin-top: 11px;
            color: $fontMainColor;
            font-weight: 400;
          }
        }
      }
    }

    @include tablet {
      .share-modal-box {
        width: 376px;
      }
    }

    @include mobile {
      .share-modal-box {
        width: 328px;
      }
    }
  }
}
</style>
