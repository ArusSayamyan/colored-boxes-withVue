<template>
  <div class="itemList" v-for="list in lists" :key="list.id">
    <p class="itemList__title">
      <span>{{ list.listName }}</span>
      <button class="itemList__randomBtn" @click="makeRandom(list.items, list.id)" v-if="!list.randomBoxes.length > 0">
        Перемешать
      </button>
      <button class="itemList__randomBtn" @click="sortBoxes(list.items, list.id)" v-else>Сортировать</button>
    </p>
    <div class="boxItem" v-if="!list.randomBoxes.length > 0">
      <div v-for="item in list.items" class="itemList__row"
           :key="item.id">
        <BoxItem
            v-if="item.checked"
            :boxItem="item"
            :is-random="isRandom"
        />
      </div>
    </div>
    <div v-else class="itemList__randomElems">
      <div v-for="item in list.randomBoxes" class="itemList__boxElement"
           :key="item.id + Math.random().toString(36).substr(2, 9)">
        <BoxItem
            v-if="item.checked"
            :boxItem="item"
            :is-random="isRandom"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";
import BoxItem from "@/components/BoxItem.vue";

const isRandom = ref(false)
const store = useStore();

const lists = computed(() => {
  return store.getters.getLists
})

function makeRandom(data, id) {
  let randomBoxes = [];

  for (let obj of data) {
    for (let i = 1; i <= obj.count; i++) {
      if (obj.checked) {
        const copy = {...obj}
        copy.count = 1;
        copy.id = obj.id + Math.random().toString(36).substr(2, 9)
        randomBoxes.push(copy)
      }
    }
  }
  for (let i = randomBoxes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomBoxes[i], randomBoxes[j]] = [randomBoxes[j], randomBoxes[i]];
  }
  store.commit('addRandomBoxes', {
    id: id,
    data: randomBoxes
  })
  isRandom.value = !isRandom.value
}

function sortBoxes(data, id) {
  const delRandomBoxes = []
  store.commit('addRandomBoxes', {
    id: id,
    data: delRandomBoxes
  })
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

  &__row {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    padding-bottom: 5px;
  }

  &__randomElems {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    gap: 5px;
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
.boxItem {
  padding-top: 10px;
}
</style>