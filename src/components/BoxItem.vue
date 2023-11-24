<template>
  <div v-for="box in props.boxItem.count" :key="box  + generateUniqueId" :id="props.boxItem.id"
       class="boxItem__box"
       :style="{backgroundColor: props.boxItem.color}"
       @click="!props.isRandom ? deleteItemBox(props.boxItem.id) : deleteFromRandom(props.boxItem.id)"></div>
</template>

<script setup>
import {defineProps, computed} from "vue";
import {useStore} from "vuex";

const store = useStore();
const props = defineProps(['boxItem', 'isRandom'])


const generateUniqueId = computed(() => {
  return Math.random().toString(36).substr(2, 9)
})
function deleteItemBox(id) {
  store.commit('deleteOneBox', id)
}

function deleteFromRandom(id) {
  store.commit('deleteBoxFromRandom', {
    id: id,
    deleteOneBox: true
  })

  //UPDATE COUNT OF BOX ITEMS
  store.commit('deleteOneBox', +id.charAt(0))
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

  &__randomBoxes {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
}
</style>