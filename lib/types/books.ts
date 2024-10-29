export type BooksResponse = {
  id: string,
  user_id: string,
  title: string,
  author: string,
};

export type SelectedBooksResponse = Pick<BooksResponse,
  'id' | 'user_id' | 'title' | 'author'
>;

export type BookUserDetails = Pick<BooksResponse,
  'user_id' | 'title' | 'author'
>;

export type BookDetails = Pick<BooksResponse,
  'title' | 'author'
>;