<template>
  <div class="mobile-header">
    <div>
      <img
        src="~/assets/img/arrow/router-back.png"
        alt="back"
        @click="$router.push('/')"
      />
    </div>
    <div>{{ title }}</div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.mobile-header {
  position: sticky;
  top: 0;
  display: flex;
  padding: 0 24px;
  width: 100%;
  height: 60px;
  align-items: center;
  border-bottom: 1px solid $sectionLine;
  z-index: 101;
  background-color: #fff;

  div {
    color: $fontMainColor;
    img {
      width: 30px;
      margin-right: 8px;
    }
  }
}
</style>
