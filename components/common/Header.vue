<template>
  <header>
    <section class="header-main">
      <article class="header-left">
        <div class="logo">
          <img src="~/assets/img/logo.png" alt="창업픽" />
        </div>
        <nav class="main-menu">
          <div
            class="menu"
            @mouseover="showSubMenu($event, '브랜드')"
            @mouseleave="closeSubMenu"
          >
            브랜드
          </div>
          <div
            class="menu"
            @mouseover="showSubMenu($event, '상권분석')"
            @mouseleave="closeSubMenu"
          >
            상권분석
          </div>
          <div class="menu">
            창업톡<img src="~/assets/img/header/community.png" alt="창업톡" />
          </div>
          <div class="menu">성공 창업상담</div>
          <div class="menu">오늘뭐먹지?</div>
        </nav>
      </article>
      <article class="header-right">
        <div><img src="~/assets/img/header/search.png" alt="검색" /></div>
        <div><img src="~/assets/img/header/mypage.png" alt="마이페이지" /></div>
        <div id="mMenu">
          <img
            src="~/assets/img/header/menu.png"
            alt="메뉴"
            @click="showAndCloseSideBar"
          />
        </div>
        <div id="pCompany"><button>기업 홈</button></div>
      </article>
    </section>
    <section
      v-show="isShowSubMenu"
      class="p-sub-menu"
      @mouseover="keepSubMenu"
      @mouseleave="closeSubMenu"
    >
      <nav ref="subMenuEl" class="sub-menu">
        <div v-for="item in subMenu[currentMenu]" :key="item.menuName">
          {{ item.menuName }}
        </div>
      </nav>
    </section>

    <SideMenuBar
      v-if="isShowSideBar"
      :sub-menu="subMenu"
      @show-and-close-side-bar="showAndCloseSideBar"
    />
  </header>
</template>

<script lang="ts" setup>
import SideMenuBar from './SideMenuBar.vue'

type SubMenu = {
  [key: string]: {
    menuName: string
    url: string
  }[]
}

const subMenu: SubMenu = {
  브랜드: [
    { menuName: '프로모션', url: '' },
    { menuName: '랭킹', url: '' },
    { menuName: '브랜드 비교', url: '' },
  ],
  상권분석: [
    { menuName: '상권분석지도', url: '' },
    { menuName: '유사상권분석', url: '' },
  ],
}

const currentMenu = ref<string>('')
const isShowSubMenu = ref<boolean>(false)
const subMenuEl = ref<HTMLElement | null>(null)

const isShowSideBar = ref<boolean>(false)

const showSubMenu = (event: Event, key: string): void => {
  currentMenu.value = key
  isShowSubMenu.value = true

  const target = event.target as HTMLDivElement
  const marginLeft = Math.ceil(target.getBoundingClientRect().left)

  if (subMenuEl.value) {
    subMenuEl.value.setAttribute('style', 'margin-left: ' + marginLeft + 'px')
  }
}

const keepSubMenu = () => {
  isShowSubMenu.value = true
}

const closeSubMenu = () => {
  isShowSubMenu.value = false
}

const showAndCloseSideBar = () => {
  isShowSideBar.value = !isShowSideBar.value
}
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  height: 60px;
  border-bottom: 1px solid $sectionLine;
  box-sizing: border-box;
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
          cursor: pointer;
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

          &:hover {
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
    border-bottom: 1px solid $sectionLine;

    .sub-menu {
      display: flex;
      height: 100%;
      align-items: center;

      div {
        color: #5a5a5a;
        margin-right: 30px;
        cursor: pointer;
        font-size: 14px;

        &:hover {
          color: $mainColor;
        }
      }
    }
  }
}
</style>
