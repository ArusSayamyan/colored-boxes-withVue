<template>
<div class="itemList" v-for="list in lists" :key="list.id">
  <p class="itemList__title">
    <span>{{ list.listName }}</span>
    <button class="itemList__randomBtn" @click="makeRandom(list.items)">Перемешать</button>
  </p>
    <BoxItem v-for="item in list.items"
             :key="item.id"
             :boxItem="item"
    />
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

function makeRandom(data) {
  console.log(data)
}
</script>

<style scoped lang="scss">
.itemList {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

  &__title {
    margin: 0;
    display: flex;
    justify-content: space-between;
  }

  &__boxes {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
  }

  &__randomBtn {
    background-color: #26a641;
    padding: 5px;
    border: none;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #ffffff;
      outline: 2px solid #26a641;
      color: #26a641;
    }
  }
}
</style>