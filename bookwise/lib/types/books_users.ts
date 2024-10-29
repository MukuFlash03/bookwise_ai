export type BooksUsersResponse = {
  id: string,
  user_id: string,
  book_id: string,
};

export type SelectedBooksUsersResponse = Pick<BooksUsersResponse,
  'book_id'
>;