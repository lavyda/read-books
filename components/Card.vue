<template>
  <div
    class="
      container
      bg-gradient-to-r
      from-indigo-700
      to-blue-700
      p-3
      rounded-lg
      shadow-lg
      text-gray-100
      tracking-wide
    "
  >
    <div class="thumbnail rounded bg-indigo-600 p-1 shadow">
      <img :src="item.thumbnail" class="rounded" />
    </div>
    <div class="details">
      <h2 class="details-title font-bold tracking-wider">{{ item.title }}</h2>
      <div class="text-gray-300">by: {{ item.author }}</div>
      <div class="details-read text-gray-300 mt-3 text-sm">read in {{ formatRead(item.read) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Book } from '../services/types'
import { monthFromRead } from '../services/date'

export default {
  name: 'Card',
  props: {
    item: {
      type: Object as PropType<Book>,
      required: true,
    },
  },
  methods: {
    formatRead(read: string) {
      const month = monthFromRead(read)
      const year = read.split('/')[1]
      return `${month} ${year}`
    },
  },
}
</script>

<style scoped>
.container {
  width: min(80%, 40rem);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
  gap: 1rem;
}

.thumbnail {
  display: grid;
  place-items: center;
}

.details {
  display: flex;
  flex-direction: column;
}

.details-title {
  font-size: clamp(1rem, 2vw + 1rem, 2rem);
}

.details-read {
  margin-block-start: auto;
}
</style>
