from pydantic import BaseModel
from typing import Optional

class BooksResponse(BaseModel):
  id: str
  user_id: str
  title: str
  author: str

class BookDetails(BaseModel):
  user_id: str
  title: str
  author: str

class BooksUsersResponse(BaseModel):
  id: str
  user_id: str
  book_id: str

class SelectedBooksUsersResponse(BaseModel):
  user_id: str
  book_id: str

class NotesResponse(BaseModel):
  id: str
  book_user_id: str
  note_title: str
  page_content_summary: list[str]
  user_notes_summary: list[str]
  comparison_analysis: str
  match_percentage: float

class SelectedNotesResponse(BaseModel):
  book_user_id: str
  note_title: str
  page_content_summary: list[str]
  user_notes_summary: list[str]
  comparison_analysis: str
  match_percentage: float

class PagesNotesResponse(BaseModel):
  id: str
  page_id: str
  note_id: str 

class PagesResponse(BaseModel):
  id: str
  book_user_id: str
  image_base64: str

class PageDetails(BaseModel):
  user_id: str
  book_id: str
  image_base64: str

class PageDetailsID(BaseModel):
  user_id: str
  book_id: str
  page_id: str

class MultiplePageIds(BaseModel):
  user_id: str
  book_id: str
  page_ids: list[str]

class UsersResponse(BaseModel):
  id: str
  user_id: str
  email: str
  name: str

class NoteGenerationContext(BaseModel):
  title: str
  author: str
  image_base64: str

class Result(BaseModel):
    winner: str

class NotesGenerationResponse(BaseModel):
  id: str
  title: str
  author: str
  note_title: str
  page_content_summary: list[str]
  user_notes_summary: list[str]
  comparison_analysis: str
  match_percentage: float

class KGInput(BaseModel):
  user_id: str
  book_ids: list[str]
  page_ids: Optional[list[str]] = None
  chapter_ids: Optional[list[str]] = None
