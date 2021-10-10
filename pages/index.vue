<template>
  <main class="bg-gradient-to-r from-indigo-800 to-blue-800 text-gray-50">
    <h1 class="mt-8 text-pink-300">just some books I read</h1>
    <Carousel :items="books" />
  </main>
</template>

<script lang="ts">
import { Client } from '@notionhq/client'
import {
  convertPage,
  retrievePage,
  queryDatabasePages,
} from '../services/notion'
import { Book } from '~/services/types'

export default {
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
}
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-family: 'Nothing You Could Do';
  font-size: clamp(1rem, 3vw + 1rem, 3rem);
}
</style>
