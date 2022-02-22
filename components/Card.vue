<template>
  <article class="h-full w-full bg-white p-4 rounded-md">
    <transition name="slide" mode="out-in">
      <figure
        :key="item.id"
        class="-mt-8 justify-self-center sm:justify-self-start"
      >
        <img
          class="max-h-full bg-gray-400 rounded-md shadow-md"
          :src="item.thumbnail"
          :alt="`Book cover`"
        />
      </figure>
    </transition>
    <transition name="fade">
      <h2 :key="item.id" class="pt-4 sm:pl-4">
        <div class="text-3xl px-2">{{ item.title }}</div>
        <hr class="w-full border-black my-3" />
        <div class="text-xl px-2">by {{ item.author }}</div>
      </h2>
    </transition>
    <transition name="fade">
      <p :key="item.id" class="justify-self-end self-end">
        read in {{ formatRead(item.read) }}
      </p>
    </transition>
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
    t: {
      type: String as PropType<'n' | 'p'>,
      default: 'n',
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter {
  transform: translateY(5%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-25%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
