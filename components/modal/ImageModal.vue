<template>
  <section class="image-modal">
    <article class="image-modal-wrapper">
      <div class="image-box">
        <div class="close-modal" @click="closeModalAndHistoryBack">
          <img src="~/assets/img/close/close_white.png" alt="close" />
        </div>
        <div class="image">
          <img :src="_currentUrl" />

          <div v-if="isArrayUrl && url.length > 1" class="page-button-left">
            <img
              src="~/assets/img/arrow/page_button_left.png"
              alt="left"
              @click="changeImageHandler('-')"
            />
          </div>
          <div v-if="isArrayUrl && url.length > 1" class="page-button-right">
            <img
              src="~/assets/img/arrow/page_button_right.png"
              alt="right"
              @click="changeImageHandler('+')"
            />
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  url: string[] | string
  currentUrl: string
}>()

const emit = defineEmits<{
  (e: 'closeImageModalHandler'): void
}>()

const _currentUrl = ref<string>(props.currentUrl)
const isArrayUrl = ref<boolean>(Array.isArray(props.url))

const changeImageHandler = (type: string) => {
  if (isArrayUrl) {
    const _url: string[] = props.url as string[]

    const findIndex = _url.findIndex((e) => e === _currentUrl.value)

    if (type === '+') {
      if (findIndex + 1 < _url.length) _currentUrl.value = _url[findIndex + 1]
    } else if (findIndex - 1 > -1) _currentUrl.value = _url[findIndex - 1]
  }
}

const closeModal = () => {
  emit('closeImageModalHandler')
}

const closeModalAndHistoryBack = () => {
  emit('closeImageModalHandler')
  history.back()
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
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 102;
  background-color: rgba(0, 0, 0, 0.6);

  .image-modal-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    .image-box {
      .close-modal {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;

        img {
          cursor: pointer;
          display: block;
          width: 30px;
        }
      }

      .image {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          border-radius: 10px;
          max-width: 540px;
          display: block;
        }

        .page-button-left,
        .page-button-right {
          position: absolute;

          img {
            cursor: pointer;
            width: 40px;
          }

          &.page-button-left {
            left: -80px;
          }

          &.page-button-right {
            right: -80px;
          }
        }
      }
    }

    @include mobile {
      .image-box {
        @include mobile-container();

        .image {
          img {
            max-width: 100%;
          }

          .page-button-left,
          .page-button-right {
            img {
              width: 30px;
            }

            &.page-button-left {
              left: 10px;
            }

            &.page-button-right {
              right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
