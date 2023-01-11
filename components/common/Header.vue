<template>
  <header>
    <section class="header-main">
      <article class="header-left">
        <div class="logo">
          <NuxtLink to="/">
            <img src="~/assets/img/logo.png" alt="창업픽" />
          </NuxtLink>
        </div>
        <nav class="main-menu">
          <div
            class="menu"
            :class="{
              active:
                activeMenu === '브랜드' ||
                subMenu['브랜드'].find((e) => e.url === $route.path),
            }"
            @mouseover="showSubMenu($event, '브랜드')"
            @mouseleave="closeSubMenu"
          >
            브랜드
          </div>
          <div class="menu">상권정보</div>
          <div class="menu">
            창업톡<img src="~/assets/img/header/community.png" alt="창업톡" />
          </div>
          <div class="menu">브랜드 MATCH</div>
          <div class="menu">오늘 뭐 먹지?</div>
        </nav>
      </article>
      <article class="header-right">
        <div>
          <img
            src="~/assets/img/header/search.png"
            alt="검색"
            @click="isShowSearchModal = true"
          />
        </div>
        <div>
          <NuxtLink to="/signin"
            ><img src="~/assets/img/header/mypage.png" alt="마이페이지"
          /></NuxtLink>
        </div>
        <div id="mMenu">
          <img
            src="~/assets/img/header/menu.png"
            alt="메뉴"
            @click="showAndCloseSideMenuModal"
          />
        </div>
        <div id="pCompany"><button>기업 서비스</button></div>
      </article>
    </section>
    <section
      v-show="isShowSubMenu"
      class="p-sub-menu"
      @mouseover="keepSubMenu"
      @mouseleave="closeSubMenu"
    >
      <nav ref="subMenuEl" class="sub-menu">
        <div
          v-for="item in subMenu[currentMenu]"
          :key="item.menuName"
          :class="{ active: $route.path === item.url }"
          @click=";[$router.push(item.url), closeSubMenu()]"
        >
          {{ item.menuName }}
        </div>
      </nav>
    </section>

    <SideMenuModal
      v-if="isShowSideMenuModal"
      :sub-menu="subMenu"
      @show-and-close-side-menu-modal="showAndCloseSideMenuModal"
    />
  </header>
  <ModalSearchModal
    v-if="isShowSearchModal"
    @close-search-modal="closeSearchModal"
  />
</template>

<script lang="ts" setup>
import SideMenuModal from '../modal/SideMenuModal.vue'

type SubMenu = {
  [key: string]: {
    menuName: string
    url: string
  }[]
}

const subMenu: SubMenu = {
  브랜드: [
    { menuName: '프로모션', url: '/brand/promotion' },
    { menuName: '지역별 브랜드 랭킹', url: '/brand/rank' },
    { menuName: '브랜드 비교', url: '/brand/compare' },
  ],
}

const currentMenu = ref<string>('')
const activeMenu = ref<string>('')
const isShowSubMenu = ref<boolean>(false)
const subMenuEl = ref<HTMLElement | null>(null)

const isShowSideMenuModal = ref<boolean>(false)
const isShowSearchModal = ref<boolean>(false)

const showSubMenu = (event: Event, key: string): void => {
  currentMenu.value = key
  activeMenu.value = key
  isShowSubMenu.value = true

  const target = event.target as HTMLDivElement
  const marginLeft = Math.ceil(target.getBoundingClientRect().left)

  if (subMenuEl.value) {
    subMenuEl.value.setAttribute('style', 'margin-left: ' + marginLeft + 'px')
  }
}

const keepSubMenu = () => {
  isShowSubMenu.value = true
  activeMenu.value = currentMenu.value
}

const closeSubMenu = () => {
  isShowSubMenu.value = false
  activeMenu.value = ''
}

const showAndCloseSideMenuModal = () => {
  isShowSideMenuModal.value = !isShowSideMenuModal.value
}

const closeSearchModal = () => {
  isShowSearchModal.value = false
}
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  height: 60px;
  border-bottom: 1px solid $sectionLine;
  z-index: 101;
  background-color: #fff;

  .header-main {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left {
      .logo {
        img {
          width: 83px;
          height: 20px;
        }

        .main-menu {
          display: none;
        }
      }
    }

    .header-right {
      height: 100%;
      display: flex;
      align-items: center;

      div {
        display: flex;
        align-items: center;
        margin-left: 24px;

        img {
          width: 30px;
          height: 30px;
          cursor: pointer;
        }

        button {
          width: 77px;
          height: 36px;
          background-color: #fff;
          border: 1px solid $sectionLine;
          border-radius: 50px;
          color: $fontSubColor;
        }
      }
    }
  }
}

@include mobile {
  .header-main {
    @include mobile-container();

    .header-left {
      nav {
        display: none;
      }
    }
    .header-right {
      div {
        display: none !important;

        &#mMenu {
          display: block !important;
        }
      }
    }
  }
}

@include tablet {
  .header-main {
    @include tablet-container();

    .header-left {
      nav {
        display: none;
      }
    }

    .header-right {
      #pCompany {
        display: none;
      }
    }
  }
}

@include pc {
  .header-main {
    @include pc-container();
    .header-left {
      display: flex;
      align-items: center;
      height: 100%;

      .logo {
        margin-right: 50px;
        cursor: pointer;
      }

      nav {
        display: flex;
        align-items: center;

        .menu {
          display: flex;
          height: 60px;
          align-items: center;
          color: $fontMainColor;
          margin-right: 24px;
          cursor: pointer;
          position: relative;
          font-size: 15px;

          &:hover,
          &.active {
            &::after {
              content: '';
              width: 100%;
              border-bottom: 2px solid $mainColor;
              position: absolute;
              bottom: 0;
              left: 0;
            }
          }

          img {
            width: 24px;
            height: 24px;
            margin-left: 4px;
          }
        }
      }
    }

    .header-right {
      #mMenu {
        display: none;
      }
    }
  }

  .p-sub-menu {
    height: 50px;
    border-top: 1px solid $sectionLine;
    border-bottom: 1px solid $sectionLine;
    background-color: #fff;

    .sub-menu {
      display: flex;
      height: 100%;
      align-items: center;

      div {
        color: #5a5a5a;
        margin-right: 30px;
        cursor: pointer;
        font-size: 14px;

        &:hover,
        &.active {
          color: $mainColor;
        }
      }
    }
  }
}
</style>
