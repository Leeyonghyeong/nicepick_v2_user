<template>
  <article>
    <div class="image">
      <img src="~/assets/img/button/favorite.png" alt="찜" />
    </div>
    <div class="text">찜</div>
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
