export type NotesResponse = {
  id: string,
  book_user_id: string,
  note_title: string,
  page_content_summary: string[],
  user_notes_summary: string[],
  comparison_analysis: string,
  match_percentage: number,
};

export type SelectedNotesResponse = Pick<NotesResponse,
  'book_user_id' |
  'note_title' | 'page_content_summary' | 'user_notes_summary' |
  'comparison_analysis' | 'match_percentage'
>;
