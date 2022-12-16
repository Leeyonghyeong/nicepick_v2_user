<template>
  <section>
    <article class="search-result-keyword">
      <div class="etc-img">
        <img
          v-if="getDevice !== 'mobile'"
          src="~/assets/img/common/search-gray.png"
          alt="search"
        />
        <img v-else src="~/assets/img/header/search.png" alt="search" />
      </div>
      <div>
        {{ $route.query.keyword }}
        <span v-if="getDevice !== 'mobile'">검색 결과</span>
      </div>
    </article>

    <CommonBrandRecommendBrandItem background-color="#F8FAFD" />

    <article class="list">
      <CommonBrandFilter :total-count="0" />

      <div v-if="brandItems.length > 0" class="brand-items">
        <CommonBrandStartCostItem
          v-for="item in brandItems"
          :key="item.id"
          :brand-item="item"
        />
      </div>
      <div v-else class="empty">검색 결과가 존재하지 않습니다.</div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWindowStore } from '~~/store/window'
import { Brand } from '~~/types/brand'

const windowStore = useWindowStore()
const { getDevice } = storeToRefs(windowStore)

const brandItems = ref<Brand[]>([])
</script>

<style lang="scss" scoped>
section {
  .search-result-keyword {
    @include pc-container();
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;

    div {
      font-size: 20px;
      color: $mainColor;
      span {
        color: $fontMainColor;
      }
      &.etc-img {
        padding: 9px;
        border-radius: 50%;
        background-color: #fafafa;
        margin-bottom: 10px;

        img {
          width: 30px;
        }
      }
    }
  }

  .list {
    @include pc-container();
    margin-top: 50px;

    .empty {
      display: flex;
      justify-content: center;
      color: $fontSubColor;
      padding: {
        top: 120px;
        bottom: 300px;
      }
    }
  }

  @include tablet {
    .search-result-keyword {
      @include tablet-container();
      padding: {
        top: 50px;
        bottom: 50px;
      }
    }

    .list {
      @include tablet-container();
    }
  }

  @include mobile {
    .search-result-keyword {
      @include mobile-container();
      flex-direction: row;
      align-items: center;
      height: 60px;
      border-bottom: 1px solid $sectionLine;

      div {
        color: $fontMainColor;
        font-size: 13px;
        &.etc-img {
          padding: 0;
          border-radius: 0;
          background-color: #fff;
          margin: 0;
          margin-right: 8px;
        }
      }
    }

    .list {
      @include mobile-container();
    }
  }
}
</style>
