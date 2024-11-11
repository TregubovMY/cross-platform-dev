<script setup>
import {defineProps, defineEmits} from 'vue';

defineProps({
  card: Object
})

const emit = defineEmits(['addToDeck'])
</script>

<template>
  <h3 class="text-2xl font-bold mb-5">Информация о карте</h3>

  <img :src="card.imageUrl" :alt="card.name">
  <p class="font-bold">{{ card.name }}</p>

  <button @click="emit('addToDeck', card)"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to deck
  </button>
</template>

<style scoped>

</style>
