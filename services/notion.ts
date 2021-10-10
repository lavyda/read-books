/* eslint-disable camelcase */
import { Client } from '@notionhq/client'
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import { Book } from './types'

export async function queryDatabasePages(
  client: Client,
  databaseId: string
): Promise<any> {
  let pages = []
  let cursor: any
  do {
    const { results, next_cursor } = await client.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    })
    pages = [...results]
    cursor = next_cursor
  } while (cursor)
  return pages.filter(({ object }) => object === 'page')
}

export function retrievePage(
  client: Client,
  pageId: string
): Promise<GetPageResponse> {
  return client.pages.retrieve({ page_id: pageId })
}

export function convertPage(page: any): Book {
  const { id, properties } = page
  return Object.keys(properties).reduce(
    (acc, prop) => ({
      ...acc,
      [prop.toLowerCase()]:
        properties[prop][properties[prop].type][0].plain_text ??
        properties[prop][properties[prop].type],
    }),
    { id } as Book
  )
}
