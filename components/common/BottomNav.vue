<template>
  <nav v-if="getDevice === 'mobile'">
    <section>
      <div class="nav-item">
        <img src="~/assets/img/nav/home.png" alt="홈" />
      </div>
      <div class="nav-item">
        <img src="~/assets/img/nav/search.png" alt="검색" />
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
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWindowStore } from '~~/store/window'

const store = useWindowStore()
const { getDevice } = storeToRefs(store)
</script>

<style lang="scss" scoped>
nav {
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 58px;
  border-top: 1px solid #f5f5f5;
  background-color: #fff;
  z-index: 100;

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
