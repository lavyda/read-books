<template>
  <article class="bg-white p-4">
    <figure class="bg-gray-400 -mt-8 shadow-md">
      <img
        :src="item.thumbnail"
        :alt="`Book cover`"
        class="bg-gray-400"
      />
    </figure>
    <h2 class="px-2">
      <div class="text-3xl px-2">{{item.title}}</div>
      <hr class="w-full border-black my-3">
      <div class="text-xl px-2">by {{item.author}}</div>
    </h2>
    <p>read in {{formatRead(item.read)}}</p>
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
  height: 100%;
  width: 100%;
  grid-template-rows: 40% 50% 10%;
  grid-template-columns: 100%;
  grid-template-areas:
    "cover"
    "details"
    "read";
}

article > figure {
  grid-area: cover;
  justify-self: center;
  aspect-ratio: 2 / 3;
  max-height: 100%;
  max-width: 100%;
}

img {
  aspect-ratio: 2 / 3;
}

h2 {
  grid-area: details;
}

p {
  grid-area: read;
  justify-self: end;
  align-self: end;
}

@media screen and (min-width: 640px) {
  article {
    width: 46rem;
    max-width: 100%;
    height: unset;
    grid-template-rows: unset;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      "cover details"
      "cover read";
  }

  article > figure {
    justify-self: unset;
    max-height: unset;
  }
}
</style>
