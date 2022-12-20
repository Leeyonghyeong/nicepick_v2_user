<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
div {
  display: grid;
  margin-top: 20px;
}

@include pc {
  div {
    gap: 50px 30px;
    grid-template-columns: repeat(6, calc((100% - 150px) / 6));
  }
}

@include tablet {
  div {
    gap: 40px 24px;
    grid-template-columns: repeat(4, calc((100% - 72px) / 4));
  }
}

@include mobile {
  div {
    gap: 30px 8px;
    grid-template-columns: repeat(3, calc((100% - 16px) / 3));
  }
}
</style>
