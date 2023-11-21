<template>
  <div v-for="item in props.items" :key="item.id" class="boxItem">
    <div v-if="item.checked" class="boxItem__boxesContainer">
      <div v-for="box in item.count" :key="box" class="boxItem__box" :style="{backgroundColor: item.color}"></div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps(['items'])

</script>

<style scoped lang="scss">
.boxItem {
  margin-top: 10px;

  &__boxesContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  &__box {
    width: 15px;
    height: 15px;
  }
}
</style>