<template>
    <div v-if="props.boxItem.checked" class="boxItem">
      <div v-for="box in props.boxItem.count" :key="box" class="boxItem__box" :style="{backgroundColor: props.boxItem.color}" @click="deleteItemBox(props.boxItem.id)"></div>
    </div>
</template>

<script setup>
import {defineProps} from "vue";
import {useStore} from "vuex";
const store = useStore();

const props = defineProps(['boxItem'])

function deleteItemBox(id) {
  console.log(id)
  store.commit('deleteOneBox', id)
}
</script>

<style scoped lang="scss">
.boxItem {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  &__box {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
}
</style>