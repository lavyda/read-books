import { Book } from './types'

export async function getBook($http: any, isbn: string): Promise<any> {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn%3C${isbn}`
  const response = await $http.$get(url)
  return response.items[0]
}

export function convertBook(book: Record<string, any>): Book {
  const {
    id,
    volumeInfo: {
      authors,
      categories,
      description,
      title,
      subtitle,
      imageLinks: { thumbnail },
    },
  } = book
  return {
    authors,
    categories,
    description,
    id,
    subtitle,
    title,
    thumbnail,
  }
}
