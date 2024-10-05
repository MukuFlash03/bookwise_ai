export type PagesResponse = {
  id: string,
  book_user_id: string,
  image_base64: string,
  // note_id: string,
  // note_url: string,
  // slug: string,
};

export type SelectedPagesResponse = Pick<PagesResponse,
  'id' | 'book_user_id' | 'image_base64'
>;

export type PageDetails = {
  user_id: string,
  book_id: string,
  image_base64: string,
}

export type MultiplePageIds = {
  user_id: string;
  book_id: string;
  page_ids: string[];
};
