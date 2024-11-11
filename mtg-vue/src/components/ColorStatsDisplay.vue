<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import { ColorStats } from '@/services/ColorStats.js';

const props = defineProps({
  colorData: {
    type: Array,
    required: true
  }
});

const chartSecond = ref(null);
const colorStats = new ColorStats();

onMounted(() => {
  colorStats.buildStats(chartSecond.value, props.colorData);
});

watch(
  () => props.colorData,
  (newData) => {
    colorStats.buildStats(chartSecond.value, newData);
  }
);
</script>

<template>
  <div ref="chartSecond" class="colorStats"></div>
</template>

<style scoped>
.colorStats {
    margin-top: 12px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
