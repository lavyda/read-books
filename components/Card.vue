<template>
  <article class="h-full w-full bg-white p-4 rounded-md">
    <figure class="-mt-8 justify-self-center sm:justify-self-start">
      <img
        class="max-h-full bg-gray-400 rounded-md shadow-md"
        :src="item.thumbnail"
        :alt="`Book cover`"
      />
    </figure>
    <h2 class="pt-4 sm:pl-4">
      <div class="text-3xl px-2">{{ item.title }}</div>
      <hr class="w-full border-black my-3" />
      <div class="text-xl px-2">by {{ item.author }}</div>
    </h2>
    <p class="justify-self-end self-end">read in {{ formatRead(item.read) }}</p>
  </article>
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
article {
  display: grid;
  grid-template-rows: minmax(0, 300px) 1fr auto;
  grid-template-areas:
    'cover'
    'details'
    'read';
}

@media screen and (min-width: 640px) {
  article {
    grid-template-rows: unset;
    grid-template-columns: minmax(0, 200px) 1fr;
    grid-template-areas:
      'cover details'
      'cover read';
  }
}

figure {
  grid-area: cover;
}

h2 {
  grid-area: details;
}

p {
  grid-area: read;
}
</style>
