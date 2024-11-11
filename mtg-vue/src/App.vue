<script setup>
import axios from 'axios';
import debounce from 'lodash.debounce';
import {onMounted, reactive, ref, watch} from 'vue';

import CardList from './components/CardList.vue';
import DeckDisplay from './components/DeckDisplay.vue';
import CardInfo from "@/components/CardInfo.vue";
import ColorStatsDisplay from "@/components/ColorStatsDisplay.vue";
import {Deck} from '@/services/Deck';
import ManaCostDisplay from "@/components/ManaCostDisplay.vue";

const cards = ref([]);
const selectedCard = ref(null);
const filters = reactive({
  findBy: 'name',
  searchQuery: '',
})

const deck = ref(new Deck());

const fetchCards = async () => {
  try {
    const params = {};
    if (filters.searchQuery !== '') {
      params[filters.findBy] = filters.searchQuery;
    }

    const {data} = await axios.get('https://api.magicthegathering.io/v1/cards', {params});

    cards.value = data.cards
  } catch (error) {
    console.error(error);
  }
}

const onChangeInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 200)

const addToDeck = (card) => {
  try {
    deck.value.addToDeck(card);
    console.log(deck.value)
  } catch (error) {
    alert(error.message);
  }
}

const removeFromDeck = (card) => {
  try {
    deck.value.removeCard(card);
    console.log(deck.value)
  } catch (error) {
    alert(error.message);
  }
}

const showInfo = (card) => {
  selectedCard.value = card;
  console.log(selectedCard.value)
};

onMounted(() => {
  const savedDeck = localStorage.getItem('deck');
  if (savedDeck) {
    deck.value = Object.assign(new Deck(), JSON.parse(savedDeck));
  }
  fetchCards()
})

watch(filters, fetchCards)

watch(deck, (newDeck) => {
  localStorage.setItem('deck', JSON.stringify(newDeck));
}, {deep: true});
</script>

<template>
  <main class="grid grid-cols-4 mx-8 m-auto bg-white rounded-xl shadow-xl">
    <section class="p-5">
      <h2 class="text-3xl font-bold mb-5">MTG</h2>
      <input class="border border-slate-400 rounded-xl px-6 py-2 pl-5 mb-1 outline-none focus:border-gray-400"
             placeholder="Поиск"
             type="text"
             @input="onChangeInput"/>
      <CardList :cards="cards" @show-info="showInfo"/>
    </section>

    <section class="mt-12 p-5 col-span-2">
      <CardInfo v-if="selectedCard" :card="selectedCard" @add-to-deck="addToDeck"/>

      <DeckDisplay :deck="deck" @add-to-deck="addToDeck" @remove-from-deck="removeFromDeck"/>
    </section>

    <section class="stats p-5 flex">
      <h2>Stats</h2>
      <div class="widgets">
        <ManaCostDisplay :mana-cost-data="deck.getManaCosts()"/>
        <ColorStatsDisplay :color-data="deck.getColors()"/>
      </div>
    </section>

  </main>
</template>

<style scoped>
</style>
