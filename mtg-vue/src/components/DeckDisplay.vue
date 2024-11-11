<template>
  <div class="p-5">
    <h2 class="text-2xl font-bold mb-4">Моя Колода</h2>
    <div class="flex space-x-4 overflow-x-auto">
      <div v-for="cardEntry in deck.getDeck()" :key="cardEntry.card.name" class="card-item flex-shrink-0 w-48 bg-gray-100 rounded-lg p-4 shadow-md">
        <img :src="cardEntry.card.imageUrl" alt="Card Image" class="w-full h-32 object-cover rounded-lg mb-2" />
        <h3 class="font-semibold text-lg">{{ cardEntry.card.name }}</h3>
        <p class="text-gray-700">Количество: {{ cardEntry.count }}</p>
        <button @click="emit('removeCard', cardEntry.card)" class="mt-2 bg-red-500 text-white rounded-md px-3 py-1 hover:bg-red-700">
          Удалить
        </button>
      </div>
    </div>
    <p class="mt-4 text-gray-600 text-sm">Всего карт: {{ deck.getTotalCount() }} / 60</p>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

defineProps({
  deck: Object
})

const emit = defineEmits(['removeCard'])
</script>

<style scoped>
.card-item {
  min-width: 12rem;
}
</style>
