<template>
  <article
    :style="{ width: `${width}px`, height: `${height ? height : 50}px` }"
  >
    <div class="image">
      <img src="~/assets/img/button/qna.png" alt="문의" />
    </div>
    <div class="text">문의</div>
  </article>
</template>

<script lang="ts" setup>
defineProps<{
  width: number
  height?: number
}>()
</script>

<style lang="scss" scoped>
article {
  display: flex;
  align-items: center;
  align-items: center;
  justify-content: center;
  background-color: $mainColor;
  border-radius: 10px;
  cursor: pointer;

  .image {
    margin-right: 4px;
    img {
      display: block;
      width: 18px;
    }
  }

  .text {
    font-size: 16px;
    color: #fff;
  }
}
</style>
