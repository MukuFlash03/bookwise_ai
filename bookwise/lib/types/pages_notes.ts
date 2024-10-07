export type PagesNotesResponse = {
  id: string,
  page_id: string,
  note_id: string,
};

export type SelectedPagesNotesResponse = Pick<PagesNotesResponse,
  'id' | 'page_id' | 'note_id'
>;

export type NoteGenerationContext = {
  title: string,
  author: string,
  image_base64: string,
};

export type PageDetailsID = {
  user_id: string,
  book_id: string,
  page_id: string,
};

export type KGInput = {
  user_id: string,
  book_ids: string[],
  page_ids?: string[],
  chapter_ids?: string[],
}

export type WCInput = {
  user_id: string,
  book_id: string,
  title: string,
  author: string,
}