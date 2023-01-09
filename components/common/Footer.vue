<template>
  <footer>
    <section>
      <article class="qna">
        <div class="qna-info">
          <div>고객센터 070-8287-2281</div>
          <div>(운영시간 10:00~20:00 주말, 공휴일 휴무)</div>
        </div>
        <div class="footer-images">
          <img src="~/assets/img/footer/insta.png" alt="인스타그램" />
          <img src="~/assets/img/footer/kakao.png" alt="카카오톡" />
          <img src="~/assets/img/footer/youtube.png" alt="유튜브" />
          <img
            src="~/assets/img/footer/playstore.png"
            alt="플레이스토어"
            class="hide-image"
          />
          <img
            src="~/assets/img/footer/appstore.png"
            alt="앱스토어"
            class="hide-image"
          />
        </div>
      </article>

      <article class="company-info">
        <div class="footer-link">
          <div
            @click="
              moveFooterLink(
                'https://nicepick.notion.site/b92941c41e6e4986b60a197ac607f1da'
              )
            "
          >
            개인정보 수집 및 이용동의
          </div>
          <div
            @click="
              moveFooterLink(
                'https://nicepick.notion.site/112ba598e8d34c39b6b3ab29d6c9e34a'
              )
            "
          >
            서비스 이용약관
          </div>
          <div
            @click="
              moveFooterLink(
                'https://nicepick.notion.site/e5db5ba7dd064fea86a0a0057d042654'
              )
            "
          >
            마케팅 정보 수신 동의
          </div>
        </div>
        <div class="info">
          <div>
            (주)삼화이노랩 대표이사 : 원용철&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            이메일 : nice1pick@gmail.com
          </div>
          <div>
            사업자등록번호 : 242-87-02414&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            통신판매업 : 제2022 - 서울강남 - 00663호&nbsp;&nbsp;&nbsp;&nbsp;
            서울특별시 강남구 테헤란로 82길15 디아이타워 6층 686
          </div>
          <div>Copyright © nicepick.co.kr. All rights reserved.</div>
        </div>
      </article>
    </section>
  </footer>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWindowStore } from '~~/store/window'

const windowStore = useWindowStore()
const { getDevice } = storeToRefs(windowStore)

const moveFooterLink = (url: string) => {
  if (getDevice.value === 'pc') {
    window.open(url, '_blank')
  } else {
    window.location.href = url
  }
}
</script>

<style lang="scss" scoped>
footer {
  height: 200px;
  width: 100%;
  background-color: #fcfcfc;

  section {
    @include pc-container();
    padding: 24px 0 21px 0;

    .qna {
      background-color: #f3f3f3;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 10px;
      padding: 0 20px;

      .qna-info {
        display: flex;
        align-items: center;

        div {
          font-size: 14px;
          color: $fontMainColor;

          &:last-child {
            font-size: 12px;
            color: $fontSubColor;
            margin-left: 10px;
          }
        }
      }

      .footer-images {
        display: flex;
        align-items: center;

        img {
          width: 24px;
          height: 24px;
          margin-left: 8px;
          cursor: pointer;
        }
      }
    }

    .company-info {
      margin-top: 20px;
      font-size: 12px;
      color: $fontSubColor;

      .footer-link {
        margin-bottom: 20px;
        cursor: pointer;
        display: flex;

        div {
          &:not(:first-child) {
            &::before {
              content: '|';
              margin: 0 20px;
            }
          }
        }
      }

      .info {
        line-height: 20px;

        div {
          &:last-child {
            font-weight: 600;
          }
        }
      }
    }
  }

  @include tablet {
    section {
      @include tablet-container();
      padding-top: 24px;
      padding-bottom: 21px;

      .qna {
        .footer-images {
          .hide-image {
            display: none;
          }
        }
      }
    }
  }
}
@include mobile {
  footer {
    height: auto;

    section {
      @include mobile-container();
      padding-top: 20px;
      padding-bottom: 27px;

      .qna {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 120px;

        .qna-info {
          flex-direction: column;
          line-height: 20px;
          margin-bottom: 20px;
        }

        .footer-images {
          .hide-image {
            display: none;
          }
        }
      }

      .company-info {
        font-size: 11px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .footer-link {
          div {
            &:not(:first-child) {
              &::before {
                content: '|';
                margin: 0 6px;
              }
            }
          }
        }

        .info {
          display: flex;
          flex-direction: column;
          align-items: center;

          div:nth-child(2) {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
