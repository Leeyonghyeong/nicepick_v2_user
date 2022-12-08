<template>
  <section>
    <article>
      <div class="button" style="background-color: #e1ecf9">
        <div class="text">
          <small>창업픽에 대해 알려드릴게요</small>
          <strong>창업픽 가이드</strong>
        </div>
        <div class="image">
          <img src="~/assets/img/main/guide.png" alt="창업픽 가이드" />
        </div>
      </div>
      <div class="button" style="background-color: #f0e4ff">
        <div class="text">
          <small>창업픽에 대해 알려드릴게요</small>
          <strong>수익성 계산기</strong>
        </div>
        <div class="image">
          <img src="~/assets/img/main/calculator.png" alt="수익성 계산기" />
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
section {
  article {
    @include pc-container();
    margin-top: 80px;
    margin-bottom: 80px;
    display: grid;
    gap: 0 30px;
    grid-template-columns: repeat(2, (calc((100% - 30px) / 2)));

    .button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 102px;
      border-radius: 10px;
      padding: 0 72px 0 102px;
      cursor: pointer;

      .text {
        display: flex;
        flex-direction: column;

        small {
          font-size: 12px;
          color: $fontSubColor;
        }

        strong {
          margin-top: 4px;
          font-size: 18px;
          font-weight: 500;
          color: $fontMainColor;
        }
      }

      .image {
        img {
          width: 80px;
        }
      }
    }
  }

  @include tablet {
    article {
      @include tablet-container();
      margin-top: 50px;
      margin-bottom: 50px;
      gap: 0 24px;
      grid-template-columns: repeat(2, (calc((100% - 24px) / 2)));

      .button {
        padding: 0 32px 0 30px;
      }
    }
  }

  @include mobile {
    article {
      @include mobile-container();
      margin-top: 30px;
      margin-bottom: 30px;
      gap: 8px 0;
      grid-template-columns: repeat(1, 100%);

      .button {
        padding: 0 32px 0 24px;
      }
    }
  }
}
</style>
