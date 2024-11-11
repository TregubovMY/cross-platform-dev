<script setup>
import {defineProps, onMounted, ref, watch} from 'vue';

import {ManaCostStats} from "@/services/ManaCostStats.js";
const props = defineProps({
  manaCostData: {
    Array,
    required: true
  }
})

const chartFirst = ref(null);
const manaStats = new ManaCostStats();

onMounted(() => {
  manaStats.buildStats(chartFirst.value, props.manaCostData);
});

watch(
  () => props.manaCostData,
  (newData) => {
    manaStats.buildStats(chartFirst.value, newData);
  }
);
</script>

<template>
  <div ref="chartFirst" class="manaStats"></div>
</template>

<style scoped>
.manaStats {
    margin-left: 20px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
