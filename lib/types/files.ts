export type FilesResponse = {
  id: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  url: string,
};

export type SelectedFilesResponse = Pick<FilesResponse,
  'id' | 'name'
>;

export type NoteTextFile = {
  fileName: string,
  filePath: string,
}
