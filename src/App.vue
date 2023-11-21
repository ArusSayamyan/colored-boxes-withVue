<template>
  <div class="mainContainer">
    <div class="mainContainer__listWrapper">
      <div class="mainContainer__list" v-for="list of lists" :key="list.id"
           :class="{'mainContainer__list--visible' : list.isVisible}">
        <div class="mainContainer__header">
          <img src="@/assets/arrowDown.svg" class="mainContainer__dropDownIcon" alt="" @click="makeListVisible(list.id)" :class="{'mainContainer__dropDownIcon--rotate' : list.isVisible}">
          <input type="checkbox" :checked="list.checked" :id="list.id" @change="changeInputStatus(list.id)" class="mainContainer__checkbox">
          <label :for="list.id"> {{ list.listName }} </label>
        </div>
        <div class="mainContainer__items">
          <ul class="mainContainer__listItems">
            <li class="mainContainer__listItem" v-for="item in list.items" :key="item.id">
              <div class="mainContainer__listItemRow">
                <input type="checkbox" :checked="item.checked" :id="item.id" @change="changeInputStatus(item.id)" class="mainContainer__checkbox">
                <label :for="item.id">{{ item.name }}</label>
              </div>
              <div class="mainContainer__props">
                <input type="number" :value="item.count" class="mainContainer__count"
                       @input="changeCountValue($event, item.id, 'count')">
                <input type="color" :value="item.color" class="mainContainer__colorPicker" @input="changeCountValue($event, item.id, 'color')">
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
import {computed} from "vue";
import ItemLists from "@/components/ItemLists.vue";

const store = useStore();
const lists = computed(() => {
  return store.getters.getLists

})

function makeListVisible(listId) {
  store.commit('showListItems', listId)
}

function changeInputStatus(id) {
  store.commit('changeStatus', id)
}

function changeCountValue(event, id, changedInput) {
  let changedValue = event.target.value;
  if(changedInput === 'count') {
    changedValue = +event.target.value
  }
  store.commit('changeBoxesCount', {
    changedInputVal: changedValue,
    id: id,
    changedInput: changedInput
  })
}
</script>


<style lang="scss">
.mainContainer {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-top: 100px;

  &__listWrapper {
    max-width: 500px;
    width: 100%;
    border: 1px solid #2c3e50;
    height: 400px;
    padding: 15px;
    overflow: auto;
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

  &__listItem {
    position: relative;

    & label:before {
      content: '';
      -webkit-appearance: none;
      background-color: transparent;
      border: 2px solid #9ea5a9;
      padding: 8px;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      cursor: pointer;
      margin-right: 5px;
    }

    & input:checked + label:after {
      content: '';
      display: block;
      position: absolute;
      top: 10px;
      left: 7px;
      width: 4px;
      height: 12px;
      border: solid #9ea5a9;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  &__header {
    position: relative;

    & label:before {
      content: '';
      -webkit-appearance: none;
      background-color: transparent;
      border: 2px solid #9ea5a9;
      padding: 8px;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      cursor: pointer;
      margin-right: 5px;
    }

    & input:checked + label:after {
      content: '';
      display: block;
      position: absolute;
      top: 4px;
      left: 23px;
      width: 4px;
      height: 12px;
      border: solid #9ea5a9;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  &__checkbox {
    display: none;
  }

  &__count {
    width: 20px;
    border: none;
    outline: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &__props {
    display: flex;
    justify-content: center;
  }

  &__dropDownIcon {
    cursor: pointer;

    &--rotate {
      transform: rotate(-90deg);
    }
  }


  @media(max-width: 728px) {
    flex-direction: column;
  }
}

//.mainContainer__listItem
//
//
//.mainContainer__listItem

//.mainContainer__listItem label:before {
//  content: '';
//  -webkit-appearance: none;
//  background-color: transparent;
//  border: 2px solid #9ea5a9;
//  padding: 8px;
//  display: inline-block;
//  position: relative;
//  vertical-align: middle;
//  cursor: pointer;
//  margin-right: 5px;
//}


</style>
