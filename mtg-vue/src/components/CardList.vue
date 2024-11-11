<script setup>
import {defineProps, defineEmits} from 'vue';

defineProps({
  cards: Array
})

const emit = defineEmits(['showInfo'])
</script>

<template>
  <section class="menu">
    <div class="" v-for="card in cards" :key="card.id">
      <div @click="emit('showInfo', card)" class=" font-bold">
        <span>{{ card.name }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu {
  padding: 5px;
  height: 550px;
  width: 250px;
  overflow: hidden;
  overflow-y: scroll;
  border: black 1px solid;
}
</style>
