<template>
  <section>
    <article v-if="getDevice !== 'mobile'" class="logo">
      <NuxtLink to="/"
        ><img src="~/assets/img/big-logo.png" alt="logo"
      /></NuxtLink>
    </article>
    <CommonMobileRouterBackHeader v-else title="로그인" />
    <article class="signin-type">
      <div class="active">개인회원</div>
      <div>기업 파트너</div>
    </article>
    <article class="signin-form">
      <div>
        <input type="text" placeholder="이메일 입력" class="input-default" />
      </div>
      <div>
        <input type="password" placeholder="비밀번호" class="input-default" />
      </div>
      <button>로그인</button>
    </article>
    <article class="find-password">
      <div>비밀번호 찾기</div>
    </article>
    <article class="social-signin">
      <div class="line">간편 로그인</div>
      <div class="social-button">
        <img src="~/assets/img/sign/social_naver.png" alt="naver" />
        <img src="~/assets/img/sign/social_kakao.png" alt="kakao" />
        <img src="~/assets/img/sign/social_apple.png" alt="apple" />
      </div>
    </article>
    <article class="signup">
      <div>
        아직 창업픽 회원이 아니신가요?
        <NuxtLink to="/signup">회원가입</NuxtLink>
      </div>
    </article>
    <article class="etc">
      <div>
        <img src="~/assets/img/sign/etc.png" alt="etc" />
      </div>
      <div>Copyright © nicepick.co.kr. All rights reserved</div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWindowStore } from '~~/store/window'

const windowStore = useWindowStore()
const { getDevice } = storeToRefs(windowStore)
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    margin-bottom: 20px;
    img {
      width: 160px;
      cursor: pointer;
    }
  }

  .signin-type {
    display: flex;
    margin-bottom: 30px;

    div {
      width: 188px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #bcbcbc;
      font-weight: 500;
      border-bottom: 1px solid #f3f3f3;
      cursor: pointer;

      &.active {
        color: #000;
        border-bottom: 2px solid #191919;
      }
    }
  }

  .signin-form {
    width: 376px;
    margin-bottom: 12px;

    div {
      position: relative;
      margin-bottom: 8px;

      &::before {
        content: '';
        position: absolute;
        background-size: cover;
        width: 20px;
        height: 20px;
        top: 15px;
        left: 16px;
      }

      &:first-child {
        &::before {
          background-image: url(~/assets/img/sign/email.png);
        }
      }

      &:nth-child(2) {
        &::before {
          background-image: url(~/assets/img/sign/password.png);
        }
      }

      input {
        width: 100%;
        padding-left: 44px;
        display: flex;
        align-items: center;
      }
    }

    button {
      width: 100%;
      height: 50px;
      background-color: $mainColor;
      color: #fff;
      border-radius: 10px;
      font-size: 16px;
    }
  }

  .find-password {
    margin-bottom: 44px;
    font-size: 12px;
    color: #707070;
  }

  .social-signin {
    padding-bottom: 16px;
    border-bottom: 1px solid $sectionLine;
    width: 376px;
    margin-bottom: 16px;
    .line {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 14px;
      color: $fontMainColor;
      flex-basis: 100%;
      margin-bottom: 16px;

      &::before {
        content: '';
        height: 1px;
        flex-grow: 1;
        background-color: $sectionLine;
        margin-right: 6px;
      }

      &::after {
        content: '';
        height: 1px;
        flex-grow: 1;
        background-color: $sectionLine;
        margin-left: 6px;
      }
    }

    .social-button {
      display: flex;
      justify-content: space-between;

      img {
        width: 120px;
        cursor: pointer;
      }
    }
  }

  .signup {
    font-size: 14px;
    color: $fontMainColor;
    margin-bottom: 43px;

    a {
      margin-left: 10px;
      color: $mainColor;
    }
  }

  .etc {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      font-size: 12px;
      color: #bcbcbc;

      img {
        width: 376px;
        margin-bottom: 30px;
      }
    }
  }
}

@include mobile {
  section {
    height: auto;
    width: 100%;
    display: block;
    position: relative;

    article {
      @include mobile-container();
    }

    .signin-type {
      font-size: 14px;

      div {
        width: calc(100% / 2);
      }
    }

    .signin-form {
      width: 100%;
      button {
        font-size: 14px;
      }
    }

    .find-password {
      text-align: center;
      font-size: 11px;
    }

    .social-signin {
      width: 100%;
      border-bottom: 0;
      padding-bottom: 0;
      .social-button {
        padding-bottom: 16px;
        border-bottom: 1px solid $sectionLine;
        display: grid;
        gap: 0 8px;
        grid-template-columns: repeat(3, calc((100% - 16px) / 3));
        img {
          width: 100%;
        }
      }
    }

    .signup {
      text-align: center;
      font-size: 13px;
    }

    .etc {
      div {
        font-size: 11px;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
