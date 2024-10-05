from fastapi import FastAPI, HTTPException
from shutil import copy2
import os
import sys
from typing import List, Dict, Any
from custom_types import KGInput

# app = FastAPI()

async def copy_text_file2(file_info: dict):
  current_file_path = os.path.abspath(__file__)
  parent_directory = os.path.dirname(os.path.dirname(current_file_path))
  sys.path.append(parent_directory)

  source_path = file_info.get("filePath")
  file_name = file_info.get("fileName")
  
  if not source_path or not file_name:
      raise HTTPException(status_code=400, detail="Invalid file information")

  destination_folder = os.path.join(parent_directory, "knowledge_graph", "data_input", "bookwise")
  destination_path = os.path.join(parent_directory, destination_folder, file_name)

  try:
      copy2(source_path, destination_path)
      return {"message": f"File copied successfully to {destination_path}"}
  except Exception as e:
      raise HTTPException(status_code=500, detail=f"Error copying file: {str(e)}")

async def copy_html_file2(kgInput: KGInput):
  current_file_path = os.path.abspath(__file__)
  parent_directory = os.path.dirname(os.path.dirname(os.path.dirname(current_file_path)))
  sys.path.append(parent_directory)

  user_id = kgInput.user_id
  book_ids = kgInput.book_ids
  page_ids = kgInput.page_ids
  chapter_ids = kgInput.chapter_ids

  books_part = "_".join(book_ids)
  pages_part = f"pages_{min(page_ids)}-{max(page_ids)}" if page_ids else ""
  chapters_part = f"chapters_{'_'.join(chapter_ids)}" if chapter_ids else ""

  name_parts = [user_id, f"books_{books_part}", pages_part, chapters_part]
  new_file_name = "_".join(filter(bool, name_parts)) + ".html"

  source_folder = os.path.join(parent_directory, "agents", "knowledge_graph", "docs")
  # original_file_name = "index.html"
  source_path = os.path.join(source_folder, new_file_name)

  if not os.path.exists(source_path):
    raise HTTPException(status_code=404, detail="Source file not found")

  destination_folder = os.path.join(parent_directory, "bookwise", "public", "generated_kg_html")
  os.makedirs(destination_folder, exist_ok=True)
  destination_path = os.path.join(destination_folder, new_file_name)

  file_info = {
      "filePath": destination_path,
      "fileName": new_file_name
  }

  try:
      copy2(source_path, destination_path)
      return {
          "message": f"File copied and renamed successfully to {destination_path}",
          "fileInfo": file_info
      }
  except Exception as e:
      raise HTTPException(status_code=500, detail=f"Error copying file: {str(e)}")
