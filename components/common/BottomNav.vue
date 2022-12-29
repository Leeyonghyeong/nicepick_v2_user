<template>
  <nav v-if="getDevice === 'mobile'">
    <section>
      <div class="nav-item" @click="router.push('/')">
        <img src="~/assets/img/nav/home.png" alt="홈" />
      </div>
      <div class="nav-item">
        <img
          v-if="isShowSearchModal"
          src="~/assets/img/nav/search_active.png"
          alt="검색"
        />
        <img
          v-else-if="$route.path.includes('/search/')"
          src="~/assets/img/nav/search_active.png"
          alt="검색"
          @click="isShowSearchModal = true"
        />
        <img
          v-else
          src="~/assets/img/nav/search.png"
          alt="검색"
          @click="isShowSearchModal = true"
        />
      </div>
      <div class="nav-item">
        <img src="~/assets/img/nav/map.png" alt="상권분석" />
      </div>
      <div class="nav-item">
        <img src="~/assets/img/nav/community.png" alt="창업톡" />
      </div>
      <div class="nav-item">
        <img src="~/assets/img/nav/mymenu.png" alt="마이메뉴" />
      </div>
    </section>
  </nav>
  <ModalSearchModal
    v-if="isShowSearchModal"
    @close-search-modal="closeSearchModal"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWindowStore } from '~~/store/window'

const windowStore = useWindowStore()
const { getDevice } = storeToRefs(windowStore)

const router = useRouter()

const isShowSearchModal = ref<boolean>(false)

const closeSearchModal = () => {
  isShowSearchModal.value = false
}
</script>

<style lang="scss" scoped>
nav {
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 58px;
  border-top: 1px solid #f5f5f5;
  background-color: #fff;
  z-index: 102;

  section {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .nav-item {
      img {
        width: 50px;
      }
    }
  }
}
</style>
