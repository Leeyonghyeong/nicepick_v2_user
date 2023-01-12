<template>
  <div class="empty-chart">
    <i class="fa-solid fa-chart-simple"></i>
    <div>정보공개서에 등록된 정보가 없습니다.</div>
    <div>자세한 내용은 본사로 문의 부탁드립니다.</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.empty-chart {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  i {
    font-size: 50px;
    margin-bottom: 10px;
  }

  div {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: $fontSubColor;
  }

  @include mobile {
    div {
      font-size: 13px;
    }
  }
}
</style>
