<template>
<div class="itemList" v-for="list in lists" :key="list.id">
  <p class="itemList__title">
    {{ list.listName }}
  </p>
    <BoxItem :items="list.items"/>
</div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import BoxItem from "@/components/BoxItem.vue";

const store = useStore();
const lists = computed(() => {
  return store.getters.getLists

})
</script>

<style scoped lang="scss">
.itemList {
  width: 100%;
  padding: 10px;
  border: 1px solid #2c3e50;
  box-sizing: border-box;
  margin-bottom: 15px;

  &__title {
    margin: 0;
  }

  &__boxes {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
  }
}
</style>