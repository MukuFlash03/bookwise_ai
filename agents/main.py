from fastapi import FastAPI, BackgroundTasks, HTTPException, Request
from typing import Dict, Any, Union, List
from db.operations import get_db_books, get_db_notes, get_db_pages
from fireworks_vision.claude import analyze_notes
from fireworks_vision.phi import analyze_pages
# from fireworks_vision import get_user_info
# from types
import asyncio
from helpers.helpers import copy_text_file2, copy_html_file2
from knowledge_graph.test import test_kg
from e2b_ci.quickstart import e2b_sample
from custom_types import KGInput
import sys
import os
from e2b import Sandbox
from e2b_code_interpreter import CodeInterpreter

import openai
import json
import sys
import os
from dotenv import load_dotenv
from e2b_ci.fireworks_eg import USER_PROMPT, chat
import base64

load_dotenv()

FIREWORKS_API_KEY = os.getenv("FIREWORKS_API_KEY")
E2B_API_KEY = os.getenv("E2B_API_KEY")

# sandbox = CodeInterpreter(
# # # sandbox = Sandbox(
#     template="mukul-test-1",
#     metadata={"user_id": "51ab042f-2389-487f-a6de-5b1535a24a28"},  
# )
# sandbox.keep_alive(60 * 60)  


sandboxID = "i55xlwdn5614dbsn6jpp2-b0b684e9"

# running_sandboxes = Sandbox.list()
running_sandboxes = CodeInterpreter.list()

# Find the sandbox by metadata
for running_sandbox in running_sandboxes:
    if running_sandbox.metadata.get("user_id", "") == '51ab042f-2389-487f-a6de-5b1535a24a28':
        # sandbox = Sandbox.reconnect(running_sandbox.sandbox_id)
        sandbox = CodeInterpreter.reconnect(running_sandbox.sandbox_id)
        sandbox.cwd = "/app"  
        break
else:
    # Sandbox not found
    pass

current_file_path = os.path.abspath(__file__)
parent_directory = os.path.dirname(os.path.dirname(current_file_path))
sys.path.append(parent_directory)
# sys.path.append(f"{parent_directory}/bookwise")

app = FastAPI()

@app.get("/generate-notes-claude/")
async def generate_notes(user_id: str, book_id: str, page_id: str):
  try:
      generated_notes = await asyncio.create_task(analyze_notes(user_id, book_id, page_id))
      print("Generated notes in generate_notes:")
      # print(generated_notes)
      return {"generated_notes": generated_notes}
  except Exception as e:
      # Handle exceptions or errors during translation
      raise HTTPException(status_code=500, detail=str(e))

@app.get("/books") 
async def get_books(user_id: str, book_id: Union[str, None] = None) -> Union[Dict[str, Any], Any]:
    """
    Retrieve books information from the database.
    """
    books = get_db_books(user_id, book_id)
    if books is None:
        raise HTTPException(status_code=404, detail="Books data not found")
    return books

@app.get("/notes")
async def get_notes(user_id: str, book_id: str, note_id: Union[str, None] = None) -> Union[Dict[str, Any], Any]:
    """
    Retrieve notes information from the database.
    """
    notes = get_db_notes(user_id, book_id, note_id)
    if notes is None:
        raise HTTPException(status_code=404, detail="Notes data not found")
    return notes

@app.get("/pages")
async def get_pages(user_id: str, book_id: str, page_id: Union[str, None] = None) -> Union[Dict[str, Any], Any]:
    """
    Retrieve pages information from the database.
    """
    page = get_db_pages(user_id, book_id, page_id)
    if page is None:
        raise HTTPException(status_code=404, detail="Pages data not found")
    return page

@app.get("/generate-notes-phi")
async def get_phi_notes(user_id: str, book_id: str, page_id: str):
  try:
      generated_notes = await asyncio.create_task(analyze_pages(user_id, book_id, page_id))
      print("Generated notes in fireworks-phi:")
      # print(generated_notes)
      return {"generated_notes": generated_notes}
  except Exception as e:
      # Handle exceptions or errors during translation
      raise HTTPException(status_code=500, detail=str(e))

@app.post("/copy-text-file")
async def copy_text_file(file_info: dict):
  try:
      print("Copying notes text file..before async")
      copiedFilesResponse = await asyncio.create_task(copy_text_file2(file_info))
      print("Copied notes text file")
      # print(copiedFilesResponse)
      return copiedFilesResponse
  except Exception as e:
      # Handle exceptions or errors during translation
      raise HTTPException(status_code=500, detail=str(e))

@app.get("/generate-knowledge-graph")
async def generate_knowledge_graph():
  try:
      testResponse = await asyncio.create_task(test_kg())
      # print(testResponse)
      return testResponse
  except Exception as e:
      # Handle exceptions or errors during translation
      raise HTTPException(status_code=500, detail=str(e))
  
@app.post("/copy-html-file")
async def copy_html_file(kgInput: KGInput):
  try:
      copiedFileResponse = await asyncio.create_task(copy_html_file2(kgInput))
      # print(copiedFileResponse)
      return copiedFileResponse
  except Exception as e:
      # Handle exceptions or errors during translation
      raise HTTPException(status_code=500, detail=str(e))

@app.get("/e2b-sample")
async def e2b_test():
  try:
      testResponse = await asyncio.create_task(e2b_sample())
      print("Testing e2b sample")
      print(testResponse)
      return testResponse
  except Exception as e:
      # Handle exceptions or errors during translation
      raise HTTPException(status_code=500, detail=str(e))

@app.post("/e2b-upload-file")
async def e2b_upload_text_file(file_info: dict):

  try:
    print("E2B: Copying notes text file..before async")

    source_path = file_info.get("filePath")
    file_name = file_info.get("fileName")
    
    if not source_path or not file_name:
        raise HTTPException(status_code=400, detail="Invalid file information")
    
    print(f"Uploading file: {source_path} to E2B sandbox")

    # content = sandbox.filesystem.list("/app/data_input/bookwise")  
    # for item in content:
    #   print(f"Is '{item.name}' directory?", item.is_dir)

    # process_cwd = sandbox.process.start("ls -al")  
    # process_cwd.wait()
    # print(process_cwd.output.stdout)

    # process_cwd = sandbox.process.start("sudo rm -rf /app/data_input/bookwise/Atomic_Habits_notes.txt 2>&1")  
    # process_cwd.wait()
    # print(process_cwd.output.stdout)
    # process_cwd = sandbox.process.start("sudo rm -rf /app/data_input/bookwise/Management_Tips_notes.txt 2>&1")  
    # process_cwd.wait()
    # print(process_cwd.output.stdout)

    # process_cwd = sandbox.process.start("sudo rm -rf /app/data_input/Atomic_Habits_notes.txt 2>&1")  
    # process_cwd.wait()
    # print(process_cwd.output.stdout)
    
    print("After checking filesystem")

    input_path = "/app/data_input/bookwise"
    
    try:
      print("Before uploading inside try")
      sandbox.cwd = input_path
      with open(source_path, "rb") as f:
        print("Before uploading inside with")
        remote_path = sandbox.upload_file(f)  
      print("After uploading inside try")

      # process_cwd = sandbox.process.start("pwd", cwd="/home")  
      process_cwd = sandbox.process.start("pwd")  
      process_cwd.wait()
      print(process_cwd.output.stdout)
      process_cwd = sandbox.process.start("ls -al ${input_path}")  
      process_cwd.wait()
      print(process_cwd.output.stdout)
      process_cwd = sandbox.process.start("ls -al ../")  
      process_cwd.wait()
      print(process_cwd.output.stdout)

      process_cwd = sandbox.process.start("sudo cp -r /home/user/${file_name} ${input_path}/${file_name} 2>&1")  
      process_cwd.wait()
      print(process_cwd.output.stdout)

      # read_process = sandbox.process.start("cat /home/user/${file_name}")
      # read_process.wait()
      # file_content = read_process.output.stdout

      # destination_path = "/app/data_input/${file_name}" 
      # sandbox.filesystem.write(destination_path, file_content)

      # verify_process = sandbox.process.start(f"cat {destination_path}")
      # verify_process.wait()
      # print(f"Content of the new file:")
      # print(verify_process.output.stdout)

      # list_process = sandbox.process.start("ls -l /app/data_input")
      # list_process.wait()
      # print(f"Directory listing:")
      # print(list_process.output.stdout)

      process_cwd = sandbox.process.start("ls -al ../")  
      process_cwd.wait()
      print(process_cwd.output.stdout)

      process_cwd = sandbox.process.start("ls -al")  
      process_cwd.wait()
      print(process_cwd.output.stdout)

      # sandbox.cwd = "/app"

      copiedFilesResponse = {"message": f"File copied successfully to E2B sandbox at {remote_path}"}
      # sandbox.close()
      # return {"message": f"File copied successfully to E2B sandbox at {remote_path}"}
    except Exception as e:
        # sandbox.close()
        raise HTTPException(status_code=500, detail=f"Error copying file: {str(e)}")
    
    # copiedFilesResponse = await asyncio.create_task(e2b_upload_file(file_info, sandbox))
    print("E2B: Copied notes text file")
    print(copiedFilesResponse)
    
    # sandbox.close()

    return copiedFilesResponse
  except Exception as e:
      # Handle exceptions or errors during translation
      raise HTTPException(status_code=500, detail=str(e))
  

@app.get("/e2b-generate-kg")
async def e2b_generate_kg():
  try:
    print("E2B: Generating KB from text file..before async")

    with CodeInterpreter(api_key=E2B_API_KEY) as code_interpreter:
      execution_output = chat(
        code_interpreter,
        USER_PROMPT,
      )

      if execution_output == None:
        print("No output from the code interpreter. Did the LLM generate any code?")
        sys.exit(1)

      # Access stdout
      print("Stdout:", execution_output.logs.stdout)
      # Access stderr
      print("Stderr:", execution_output.logs.stderr)

      # Access any runtime errors
      print("AI-generated Python runtime error:", execution_output.error)

      # Access any results of code execution - charts, interpreter last line, images, etc.
      print("Results:", execution_output.results)
      if len(execution_output.results) == 0:
        print("No results from the code interpreter...")
        sys.exit(0)

      first_result = execution_output.results[0]
      print(first_result)

      # If we received a chart in PNG form, we can visualize it
      print("Before if first_result")

      if first_result.png:
        # Decode the base64 encoded PNG data
        print("Decoding image data...")
        png_data = base64.b64decode(first_result.png)

        # Generate a unique filename for the PNG
        filename = f"word_cloud.png"
        
        print("Saving to file...")
        # Save the decoded PNG data to a file
        with open(filename, "wb") as f:
            f.write(png_data)

        print(f"Saved chart to {filename}")
      
      # sandbox.close()
      # return {"message": f"File copied successfully to E2B sandbox at {remote_path}"}
    
    copiedFilesResponse = {"message": f"Generating KG successfully to E2B sandbox"}
    # copiedFilesResponse = await asyncio.create_task(e2b_upload_file(file_info, sandbox))
    print("E2B: Generating KG text file")
    print(copiedFilesResponse)
    
    # sandbox.close()

    return copiedFilesResponse
  except Exception as e:
      # Handle exceptions or errors during translation
      raise HTTPException(status_code=500, detail=str(e))


@app.post("/e2b-download-file")
async def e2b_download_html_file(kgInput: KGInput):
  try:
    print("E2B: Downloading KG html file..before async")
    # copiedFilesResponse = await asyncio.create_task(e2b_download_file(kgInput))
    print("E2B: Dowloaded KG html file")
    # print(copiedFilesResponse)

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

    source_folder = os.path.join("/", "app", "docs")
    # original_file_name = "index.html"
    source_path = os.path.join(source_folder, new_file_name)

    # process_cwd = sandbox.process.start("pwd")  
    # process_cwd.wait()
    # print(process_cwd.output.stdout)

    # process_cwd = sandbox.process.start("ls -al")  
    # process_cwd.wait()
    # print(process_cwd.output.stdout)

    # if not os.path.exists(source_path):
    #   print(f"Source file not found: {source_path}")
    #   raise HTTPException(status_code=404, detail="Source file not found")

    destination_folder = os.path.join(parent_directory, "bookwise_ai", "bookwise", "public", "generated_kg_html")
    os.makedirs(destination_folder, exist_ok=True)
    destination_path = os.path.join(destination_folder, new_file_name)
    
    file_info = {
        "filePath": destination_path,
        "fileName": new_file_name
    }

    print(f"Downloading file: {source_path} from E2B sandbox")

    process_cwd = sandbox.process.start("ls -al")  
    process_cwd.wait()
    print(process_cwd.output.stdout)

    process_cwd = sandbox.process.start("ls -al docs")  
    process_cwd.wait()
    print(process_cwd.output.stdout)

    print("Before downloading outside try")

    try:
      print("Before downloading inside try")
      print("Source path: ", source_path)
      
      file_in_bytes = sandbox.download_file(source_path)  
      
      print("Before downloading outside with")

      with open(destination_path, "wb") as f:  
        print("Before downloading inside with")
        f.write(file_in_bytes)  
      
      print("After downloading inside try / outside with")
      
      copiedFilesResponse = {
          "message": f"File downloaded from E2B sandbox successfully to {destination_path}",
          "fileInfo": file_info
      }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error downloading file: {str(e)}")

    print(copiedFilesResponse)
    return copiedFilesResponse
  except Exception as e:
      # Handle exceptions or errors during translation
      raise HTTPException(status_code=500, detail=str(e))

