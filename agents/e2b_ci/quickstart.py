from e2b_code_interpreter import CodeInterpreter
from e2b import Sandbox
import os
import sys
from fastapi import HTTPException
from typing import List, Dict, Any
from custom_types import KGInput

def e2b_sample():
  with CodeInterpreter() as sandbox:
    sandbox.notebook.exec_cell("x = 1")

    execution = sandbox.notebook.exec_cell("x+=1; x")
    print(execution.text)  # outputs 2
    print("Notebook execution completed.")

"""
def e2b_upload_file(file_info: dict, sandbox):
  source_path = file_info.get("filePath")
  file_name = file_info.get("fileName")
  
  if not source_path or not file_name:
      raise HTTPException(status_code=400, detail="Invalid file information")
  
  print(f"Uploading file: {source_path} to E2B sandbox")

  # content = sandbox.filesystem.list("/")  
  # for item in content:
  #   print(f"Is '{item.name}' directory?", item.is_dir)

  print("After checking filesystem")
  
  try:
    print("Before uploading inside try")
    with open(source_path, "rb") as f:
      print("Before uploading inside with")
      remote_path = sandbox.upload_file(f)  
    print("After uploading inside try")
    return {"message": f"File copied successfully to E2B sandbox at {remote_path}"}
  except Exception as e:
      raise HTTPException(status_code=500, detail=f"Error copying file: {str(e)}")


def e2b_download_file(kgInput: KGInput):
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

  source_folder = os.path.join("knowledge_graph", "docs")
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

  print(f"Downloading file: {source_path} from E2B sandbox")

  try:
    file_in_bytes = sandbox.download_file(source_path)  
    with open(destination_path, "wb") as f:  
        f.write(file_in_bytes)  
    return {
        "message": f"File downloaded from E2B sandbox successfully to {destination_path}",
        "fileInfo": file_info
    }
  except Exception as e:
      raise HTTPException(status_code=500, detail=f"Error downloading file: {str(e)}")
"""