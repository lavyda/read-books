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
      <div class="text-4xl font-bold tracking-wider">{{ item.title }}</div>
      <div class="text-gray-300">by: {{ item.authors.join(', ') }}</div>
      <div class="flex gap-2 mt-4">
        <span
          v-for="category in formatCategories(item.categories)"
          :key="category"
          class="py-1 px-2 rounded bg-indigo-600 shadow text-sm"
          >{{ category }}</span
        >
      </div>
    </div>
    <div
      class="
        desc
        px-3
        py-2
        rounded
        bg-gradient-to-r
        from-indigo-600
        to-blue-600
        shadow
        leading-relaxed
        text-sm
      "
    >
      {{ item.description }}
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Book } from '../services/types'

export default {
  name: 'Card',
  props: {
    item: {
      type: Object as PropType<Book>,
      required: true,
    },
  },
  methods: {
    formatCategories(categories: string[]) {
      return categories
        .map((category) => category.split(/,|&/))
        .flat()
        .map((category) => category.toLowerCase())
    },
  },
}
</script>

<style scoped>
.container {
  width: 50rem;
  display: grid;
  grid-template-columns: 125px 1fr;
  grid-template-rows: 190px 9rem;
  grid-template-areas:
    'thumbnail details'
    'desc desc';
  gap: 1rem;
}

.thumbnnail {
  grid-area: thumbnail;
  height: 0;
  padding-top: 150%;
  position: relative;
  width: 100%;
}

.details {
  grid-area: details;
  display: flex;
  flex-direction: column;
}

.desc {
  grid-area: desc;
  overflow: scroll;
}

img {
  height: 100%;
}
</style>
