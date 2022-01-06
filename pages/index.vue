<template>
  <main class="w-full h-full flex flex-col items-center	sm:justify-center sm:gap-8">
    <h1 class="mt-8 text-gray-600">just some books I read</h1>
    <div class="sm:flex sm:justify-center sm:gap-4 w-full px-4 sm:px-2 py-8 sm:py-0 fit">
      <div class="w-6 hidden sm:flex items-center">
        <button
          v-if="showPrevious"
          aria-label="prevoius"
          @click="previous"
        >
          <chevron-left />
        </button>
      </div>
      <Card :item="selected"/>
      <div class="w-6 hidden sm:flex items-center">
        <button
          v-if="showNext"
          aria-label="next"
          @click="next"
        >
          <chevron-right />
        </button>
      </div>
    </div>
    <div class="sm:hidden flex gap-4 h-6">
      <div class="w-6">
        <button
          v-if="showPrevious"
          aria-label="prevoius"
          @click="previous"
        >
          <chevron-left />
        </button>
      </div>
      <div class="w-6">
        <button
          v-if="showNext"
          aria-label="next"
          @click="next"
        >
          <chevron-right />
        </button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Client } from '@notionhq/client'
import {
  convertPage,
  retrievePage,
  queryDatabasePages,
} from '../services/notion'
import { Book } from '~/services/types'

export default Vue.extend({
  async asyncData({ $config }: { $config: any }) {
    const notion = new Client({
      auth: $config.notionApiToken,
    })
    const pages = await queryDatabasePages(notion, $config.notionReadBooksDb)
    const pagesWithContent = await Promise.all(
      pages.map(({ id }: { id: string }) => retrievePage(notion, id))
    )
    const books: Book[] = pagesWithContent.map(convertPage)
    return { books }
  },
  data() {
    return {
      books: [],
      selectedIndex: 0,
    }
  },
  computed: {
    selected(): Book {
      return this.books[this.selectedIndex];
    },
    showPrevious(): boolean {
      return !!this.selectedIndex;
    },
    showNext(): boolean {
      return this.selectedIndex < this.books.length - 1;
    }
  },
  methods: {
    previous(): void {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    },
    next(): void {
      if (this.selectedIndex < this.books.length - 1) {
        this.selectedIndex++;
      }
    }
  },
})
</script>

<style scoped>
h1 {
  font-family: 'Nothing You Could Do';
  font-size: clamp(1rem, 3vw + 1rem, 3rem);
}

.fit {
  flex-grow: 1;
}

@media screen and (min-width: 640px) {
  .fit  {
    flex-grow: unset;  
  }
}
</style>
