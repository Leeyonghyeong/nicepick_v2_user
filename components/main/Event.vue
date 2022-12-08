<template>
  <section>
    <article>
      <div class="top">
        <div class="title">이벤트</div>
        <div class="page-button">
          <div class="show-all">
            전체보기<img
              v-if="getDevice === 'mobile'"
              src="~/assets/img/arrow/more.png"
              alt="more"
            />
          </div>
          <div v-if="getDevice !== 'mobile'" class="button">
            <img src="~/assets/img/arrow/page_button_left.png" alt="prev" />
            <img src="~/assets/img/arrow/page_button_right.png" alt="next" />
          </div>
        </div>
      </div>

      <div class="event-list">
        <div class="event-item">
          <div class="event-image">
            <img src="~/assets/img/event/event1.png" alt="event1" />
          </div>
          <div class="event-name">대국민 월세 지원 이벤트</div>
          <div class="event-date">2022.06.01 ~ 2022.12.31</div>
        </div>

        <div class="event-item">
          <div class="event-image">
            <img src="~/assets/img/event/event2.png" alt="event2" />
          </div>
          <div class="event-name">2022 카타르 월드컵 응원댓글 이벤트</div>
          <div class="event-date">2022.11.07 ~ 2022.12.03</div>
        </div>
        <div class="event-item">
          <div class="event-image">
            <img src="~/assets/img/event/event3.png" alt="event3" />
          </div>
          <div class="event-name">My공인중개사 사전가입 이벤트</div>
          <div class="event-date">2022.06.16 ~ 2022.07.30</div>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWindowStore } from '~~/store/window'

const store = useWindowStore()
const { getDevice } = storeToRefs(store)
</script>

<style lang="scss" scoped>
section {
  article {
    @include pc-container();

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 18px;
        font-weight: 500;
        color: $fontMainColor;
        margin-right: 40px;
      }

      .page-button {
        font-size: 12px;
        color: $fontSubColor;
        display: flex;
        align-items: center;

        .show-all {
          cursor: pointer;
        }

        .button {
          img {
            width: 30px;
            height: 30px;
            margin-left: 12px;
            cursor: pointer;
          }
        }
      }
    }

    .event-list {
      margin-top: 20px;
      display: grid;
      gap: 0 30px;
      grid-template-columns: repeat(3, calc((100% - 60px) / 3));

      .event-item {
        cursor: pointer;
        .event-image {
          border-radius: 10px;
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        .event-name {
          margin: 10px 0 7px 0;
          font-size: 14px;
          color: $fontMainColor;
        }

        .event-date {
          color: #bcbcbc;
          font-size: 12px;
        }
      }
    }
  }

  @include tablet {
    article {
      @include tablet-container();

      .event-list {
        gap: 0 23px;
        grid-template-columns: repeat(3, calc((100% - 46px) / 3));
      }
    }
  }

  @include mobile {
    article {
      width: 100%;
      margin: 0;
      margin-top: 30px;

      .top {
        @include mobile-container();
        .title {
          font-size: 16px;
        }

        .page-button {
          .show-all {
            display: flex;
            align-items: center;

            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }

      .event-list {
        @include mobile-container();
        white-space: nowrap;
        height: 202px;
        overflow-x: auto;
        gap: 0;
        display: block;
        padding-bottom: 30px;
        border-bottom: 6px solid #f3f3f3;

        .event-item {
          display: inline-block;
          width: 211px;
          margin-right: 8px;
          height: 100%;

          .event-name {
            font-size: 13px;
          }

          .event-date {
            font-size: 11px;
          }
        }
      }
    }
  }
}
</style>
