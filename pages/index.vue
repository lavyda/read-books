<template>
  <main class="bg-gradient-to-r from-indigo-800 to-blue-800 text-gray-50">
    <h1 class="text-5xl mt-8 text-pink-300">just some books I read</h1>
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
import { convertBook, getBook } from '../services/googleBooks'

export default {
  async asyncData({ $config, app }: { $config: any; app: any }) {
    const notion = new Client({
      auth: $config.notionApiToken,
    })
    const pages = await queryDatabasePages(notion, $config.notionReadBooksDb)
    const pagesWithContent = await Promise.all(
      pages.map(({ id }: { id: string }) => retrievePage(notion, id))
    )
    const isbns = pagesWithContent.map(convertPage).map((book) => book.ISBN)
    const booksMeta = await Promise.all(
      isbns.map((isbn) => getBook(app.$http, isbn))
    )
    const books = booksMeta.map(convertBook)
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
}
</style>
