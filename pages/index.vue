<template>
  <main
    class="
      h-full
      py-4
      px-2
      sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-6
    "
  >
    <h1 class="text-gray-600">just some books I read</h1>

    <div class="card flex gap-2 sm:h-full sm:m-w-full">
      <div class="w-6 flex items-center">
        <button v-if="showPrevious" aria-label="previous" @click="previous">
          <chevron-left />
        </button>
      </div>

      <Card :item="selected" />

      <div class="w-6 flex items-center">
        <button v-if="showNext" aria-label="next" @click="next">
          <chevron-right />
        </button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
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
      return this.books[this.selectedIndex]
    },
    showPrevious(): boolean {
      return !!this.selectedIndex
    },
    showNext(): boolean {
      return this.selectedIndex < this.books.length - 1
    },
  },
  methods: {
    previous(): void {
      if (this.selectedIndex > 0) {
        this.selectedIndex--
      }
    },
    next(): void {
      if (this.selectedIndex < this.books.length - 1) {
        this.selectedIndex++
      }
    },
  },
})
</script>

<style scoped>
h1 {
  height: 10%;
  font-family: 'Nothing You Could Do';
  font-size: clamp(1rem, 3vw + 1rem, 3rem);
  text-align: center;
}

.card {
  height: 90%;
}

@media screen and (min-width: 640px) {
  .card {
    max-height: 23rem;
    width: 46rem;
  }
}
</style>
