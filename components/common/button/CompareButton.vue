<template>
  <article>
    <div class="image">
      <img src="~/assets/img/button/compare.png" alt="비교" />
    </div>
    <div class="text">비교</div>
  </article>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
article {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .image {
    img {
      display: block;
      width: 30px;
    }
  }

  .text {
    font-size: 12px;
    color: $fontMainColor;
  }
}
</style>
