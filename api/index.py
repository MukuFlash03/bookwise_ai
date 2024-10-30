import sys
from pathlib import Path
from typing import Dict, Any, Union
from fastapi import FastAPI, HTTPException
import asyncio
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Setup path resolution
API_DIR = Path(__file__).parent
ROOT_DIR = API_DIR.parent
sys.path.append(str(API_DIR))

# Load environment variables
load_dotenv(ROOT_DIR / '.env')

# Import local modules
from db.operations import get_db_books, get_db_notes, get_db_pages
from agents.claude import analyze_notes


### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.get("/api/py/generate-notes-claude")
async def generate_notes(user_id: str, book_id: str, page_id: str):
  logging.info(f"Generate notes called with user_id: {user_id}, book_id: {book_id}, page_id: {page_id}")
  print(f"Generate notes called with user_id: {user_id}, book_id: {book_id}, page_id: {page_id}")

  try:
      async with asyncio.timeout(50): 
        logging.info("Before calling analyze_notes")
        print("Before calling analyze_notes")
        generated_notes = await asyncio.create_task(analyze_notes(user_id, book_id, page_id))
        logging.info("Generated notes in generate_notes:")
        print("Generated notes in generate_notes:")
        # print(generated_notes)
        logging.info(f"Notes generated successfully: {generated_notes}")
        return {"generated_notes": generated_notes}
  except asyncio.TimeoutError:
      logging.error("Note generation timed out after 50 seconds")
      raise HTTPException(status_code=504, detail="Note generation timed out")
  except Exception as e:
      logging.error(f"Error generating notes: {str(e)}")
      import traceback
      logging.error(f"Traceback: {traceback.format_exc()}")
      raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/py/books") 
async def get_books(user_id: str, book_id: Union[str, None] = None) -> Union[Dict[str, Any], Any]:
    """
    Retrieve books information from the database.
    """
    books = get_db_books(user_id, book_id)
    if books is None:
        raise HTTPException(status_code=404, detail="Books data not found")
    return books

@app.get("/api/py/notes")
async def get_notes(user_id: str, book_id: str, note_id: Union[str, None] = None) -> Union[Dict[str, Any], Any]:
    """
    Retrieve notes information from the database.
    """
    notes = get_db_notes(user_id, book_id, note_id)
    if notes is None:
        raise HTTPException(status_code=404, detail="Notes data not found")
    return notes

@app.get("/api/py/pages")
async def get_pages(user_id: str, book_id: str, page_id: Union[str, None] = None) -> Union[Dict[str, Any], Any]:
    """
    Retrieve pages information from the database.
    """
    page = get_db_pages(user_id, book_id, page_id)
    if page is None:
        raise HTTPException(status_code=404, detail="Pages data not found")
    return page
