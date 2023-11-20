<template>
  <div v-for="item in props.items" :key="item.id" class="boxItem">
    <div v-if="item.checked" class="boxItem__boxesContainer">
      <div v-for="box in item.count" :key="box" class="boxItem__box" :style="{backgroundColor: item.color}"></div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, defineProps} from "vue";

const store = useStore();
const props = defineProps(['items'])
const listItems = computed(() => {
  return store.getters.getLists

})

console.log(listItems)
</script>

<style scoped lang="scss">
.boxItem {
  margin-top: 10px;

  &__boxesContainer {
    display: flex;
    gap: 5px;
  }

  &__box {
    width: 15px;
    height: 15px;
    border: 1px solid #2c3e50;
  }
}
</style>