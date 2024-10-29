from supabase import create_client, Client
from typing import Union
from dotenv import load_dotenv
import os
from pathlib import Path

root_dir = Path(__file__).parent.parent.parent
load_dotenv(root_dir / '.env')

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "")
# key: str = os.environ.get("SUPABASE_ANON_KEY", "")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY", "")

supabase: Client = create_client(url, key)

# def user_exists(key: str = "email", value: str = None):
#     user = supabase.from_("users").select("*").eq(key, value).execute()
#     return len(user.data) > 0

def get_db_book_user_id(user_id: str, book_id: str):
  try:
    book_user_id = supabase\
        .table("bw_books_users")\
        .select("id")\
        .eq("user_id", user_id)\
        .eq("book_id", book_id)\
        .execute()
    # print(book_user_id)
    if book_user_id.data and len(book_user_id.data) > 0:
        return book_user_id.data[0]['id']
    else:
        return None
  except Exception as e:
      print(f"Error: {e}")
      return {"message": "Book_User data not found"}
  
def get_db_books(user_id: str, book_id: Union[str, None] = None):
  # book_user_id = get_db_book_user_id(user_id, book_id)
  # print(book_user_id)
  try:
    if book_id is None:
      books = supabase\
          .table("bw_books")\
          .select("*")\
          .eq("user_id", user_id)\
          .execute()
      # print(books)
      return books
    else:
      book = supabase\
          .table("bw_books")\
          .select("*")\
          .eq("id", book_id)\
          .eq("user_id", user_id)\
          .execute()
      # print(book)
      return book
  except Exception as e:
      print(f"Error: {e}")
      return {"message": "Book data not found"}

def get_db_pages(user_id: str, book_id: str, page_id: Union[str, None] = None):
  print("Inside get_db_pages")
  print("Supabase URL:", url)
  print("Supabase Key:", key)
  book_user_id = get_db_book_user_id(user_id, book_id)

  if book_user_id is None:
    return {"message": "Book_User data not found"}
  
  try:
    if page_id is None:
      pages = supabase\
          .table("bw_pages")\
          .select("*")\
          .eq("book_user_id", book_user_id)\
          .execute()
      # print(pages)
      return pages
    else:
      page = supabase\
          .table("bw_pages")\
          .select("*")\
          .eq("id", page_id)\
          .eq("book_user_id", book_user_id)\
          .execute()
      # print(page)
      return page
  except Exception as e:
      print(f"Error: {e}")
      return {"message": "Page data not found"}

def get_db_notes(user_id: str, book_id: str, note_id: Union[str, None] = None):
  book_user_id = get_db_book_user_id(user_id, book_id)

  if book_user_id is None:
    return {"message": "Book_User data not found"}
  
  try:
    if note_id is None:
      notes = supabase\
          .table("bw_notes")\
          .select("*")\
          .eq("book_user_id", book_user_id)\
          .execute()
      # print(notes)
      return notes
    else:
      note = supabase\
          .table("bw_notes")\
          .select("*")\
          .eq("id", note_id)\
          .eq("book_user_id", book_user_id)\
          .execute()
      print(note)
      return note
  except Exception as e:
      print(f"Error: {e}")
      return {"message": "Note data not found"}


def get_db_notes_context(user_id: str, book_id: str, page_id):
  PageData = get_db_pages(user_id, book_id, page_id)
  BookData = get_db_books(user_id, book_id)

  # print(PageData)
  # print(BookData)

  note_generation_context = {
      "title": BookData.data[0]["title"],
      "author": BookData.data[0]["author"],
      "image_base64": PageData.data[0]["image_base64"],
  }

  # print(note_generation_context)
  print("*" * 100)

  return note_generation_context
