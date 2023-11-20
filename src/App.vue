<template>
  <div class="mainContainer">
    <div class="mainContainer__listWrapper">
      <div class="mainContainer__list" v-for="list of lists" :key="list.id"
           :class="{'mainContainer__list--visible' : isVisible}">
        <div class="mainContainer__header">
          <img src="@/assets/arrowDown.svg" alt="" @click="makeListVisible">
          <input type="checkbox" :checked="list.checked" @change="changeInputStatus(list.id)">
          <span> {{ list.listName }} </span>
        </div>
        <div class="mainContainer__items">
          <ul class="mainContainer__listItems">
            <li class="mainContainer__listItem" v-for="item in list.items" :key="item.id">
              <div>
                <input type="checkbox" :checked="item.checked" @change="changeInputStatus(item.id)">
                <span>{{ item.name }}</span>
              </div>
              <div>
                <span>{{ item.count }}</span>
                <input type="color" :value="item.color" class="mainContainer__colorPicker">
<!--                <div class="mainContainer__coloredBox" :style="{backgroundColor: }"></div>-->
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <div class="mainContainer__listWrapper">
      <ItemLists></ItemLists>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";
import ItemLists from "@/components/ItemLists.vue";

const store = useStore();
const isVisible = ref(false)
const lists = computed(() => {
  return store.getters.getLists

})

function makeListVisible() {
  isVisible.value = !isVisible.value;
}

function changeInputStatus(id) {
  store.commit('changeStatus', id)
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.mainContainer {
  display: flex;
  justify-content: space-around;
  gap: 20px;

  &__listWrapper {
    max-width: 500px;
    width: 100%;
    border: 1px solid #2c3e50;
    height: 400px;
    padding: 15px;
  }

  &__list {
    max-width: 350px;
    width: 100%;
    height: 30px;
    overflow: hidden;

    &--visible {
      height: auto;
      overflow: auto;
    }
  }

  &__listItems {
    list-style: none;
  }

  &__listItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }

  &__colorPicker {
    width: 25px;
    height: 25px;
    appearance: none;
    background: none;
    border: none;
  }
}
</style>
