import fireworks.client
from fireworks.client import Fireworks
import base64
import os
import openai
from pydantic import BaseModel, Field
from custom_types import NoteGenerationContext, Result, NotesGenerationResponse
from db.operations import get_db_notes_context
import asyncio
from dotenv import load_dotenv
import os

load_dotenv()

fireworks.client.api_key = os.getenv("FIREWORKS_API_KEY")

# client = openai.OpenAI(
#     base_url="https://api.fireworks.ai/inference/v1",
#     api_key=os.getenv("FIREWORKS_API_KEY"),
# )

model_llama="accounts/fireworks/models/llama-v3p1-8b-instruct",
model_phi="accounts/fireworks/models/phi-3-vision-128k-instruct"

async def analyze_pages(user_id: str, book_id: str, page_id: str):
  try:
    note_generation_context = get_db_notes_context(user_id, book_id, page_id)
    print("Note generation context:", note_generation_context)
    print("Attempting chat completion...")
    generated_note_response = await asyncio.create_task(get_chat_completion(note_generation_context))
    # print("Chat completion:", generated_note_response)
    return generated_note_response
  except Exception as e:
    print(f"Error in analyze_notes: {e}")
    return None

async def get_chat_completion(note_generation_context: NoteGenerationContext):
  try:
    print("Getting chat completion...")

    base64_image = note_generation_context["image_base64"]
    system_prompt = get_system_prompt(note_generation_context)
    user_prompt = get_user_prompt(note_generation_context)

    print("About to define response...")

    response = fireworks.client.ChatCompletion.create(
      model = model_phi,
      response_format={"type": "json_object", "schema": NotesGenerationResponse.model_json_schema()},
      messages = [
        {
          "role": "system", 
          "content": system_prompt
        },
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": user_prompt,
            }, 
            {
              "type": "image_url",
              "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}"
              },
            }, 
          ],
        }
      ],
    )

    print("About to print response...")
    print(repr(response.choices[0].message.content))

    # print("Chat completion:", response)
    return repr(response.choices[0].message.content)
    # return response
    # return "Hello world"
  except Exception as e:
      print(f"Error in get_chat_completion: {e}")
      return None
  
def get_system_prompt(noteContext: NoteGenerationContext):
  systemPrompt = f"""
    You are an AI assistant specialized in analyzing handwritten notes and book content.
    You will be provided with text extracted from an image of a book page with handwritten notes, along with the book's title and author.
    Your task is to analyze this information and provide a summary of both the book content and the user's notes, considering the context of the entire book.

    I will give you the following information:
    - Book Title: ${noteContext["title"]}
    - Book Author: ${noteContext["author"]}

    Instructions:
    1. Consider the book's title and author to provide context for your analysis.
    2. Carefully review the provided text, distinguishing between printed book content and handwritten notes.
    3. Summarize the main points of the book content on this page, relating it to the book's overall theme if possible.
    4. Identify and summarize the key points from the user's handwritten notes.
    5. Compare the user's notes to the book content, highlighting any insights or connections made by the user.
    6. Provide a brief analysis of how well the user's notes capture the important points from the book.

    Convert and group the text into a structured JSON object.
      The text will have data grouped into these sections: Book: [Title] by [Author], Book Content Summary, User Notes Summary, Comparison and Analysis, Match Percentage"
  
    Your output should be formatted as follows:

    Title: [Title of the book]
    Author: [Author of the book]

    Note Title: [Title of page or notes based on page context. High-level title for the note based on the page content. It should capture the overall essence of the page. Do not simply include page numbers. 10 words max.]

    Page Content Summary:
    [Provide a summary of the main points from the page content as an array.  Give at least 10 bullets points. The bullet points can be long and contain multiple sentences..]

    User Notes Summary:
    [Summarize the key points from the user's handwritten notes, markings, highlights (might be colored or marked with marker), annotations, symbols (for instance star marks, check marks) as an array. 5-6 bullets points max. The bullet points can be long and contain multiple sentences.]

    Comparison and Analysis:
    [Briefly compare the user's notes to the book content, highlighting insights and assessing the notes' effectiveness. Compare and contrast the page summary with the users notes. Identify any missing points in the users notes. One paragraphs max or 5-6 sentences max.]

    Ensure your analysis is based on the information provided in the image text and the context of the book.
    Be objective and concise in your assessment.

    Match Percentage: 
    [Match percentage of how well the users notes aligns with matches the overalll summary. Coherence of how well the users notes aligns with matches the overall summary. Should be between 0 and 100.]

    Important: Provide only the output in the exact format specified above. Do not include any additional text, explanations, or commentary before or after the requested output.
  """
  return systemPrompt
  

def get_user_prompt(noteContext: NoteGenerationContext):
  userPrompt = f"""
    I am giving you the image of a page in a book that I was reading. I like to make notes so that I can really imbibe the content and learnings. 
    But you see if I don't revisit or reread the book I will forget the learnings. 
    So, I want you to look at my marking, highlighting, underlining patterns in the image and then extract the relevant notes from the book's text on the given page.
    This won't be an exact match of the summary of the page. I marked what I personally found important that may or may not match what you would include in the summary. 
    Also, give a side by side comparison of the "short summary that you would generate from the text as a whole" versus "the notes I have marked".

    I will give you the following information:
    - Book Title: ${noteContext["title"]}
    - Book Author: ${noteContext["author"]}
  """
  return userPrompt



#############################################################

async def analyze_pages_2():
  chat_completion = client.chat.completions.create(
      model="accounts/fireworks/models/mixtral-8x7b-instruct",
      response_format={"type": "json_object", "schema": Result.model_json_schema()},
      messages=[
          {
              "role": "user",
              "content": "Who won the US presidential election in 2012? Reply just in one JSON.",
          },
      ],
  )

  print(repr(chat_completion.choices[0].message.content))
  # return chat_completion
  return repr(chat_completion.choices[0].message.content)


async def analyze_pages_1():
  def encode_image(image_path):
      with open(image_path, "rb") as image_file:
          return base64.b64encode(image_file.read()).decode('utf-8')

  image_path = "fireworks_vision/b1_p18.png"
  image_base64 = encode_image(image_path)

  response = fireworks.client.ChatCompletion.create(
    model = model_phi,
    messages = [{
      "role": "user",
      "content": [{
        "type": "text",
        "text": "Can you describe this image?",
      }, {
        "type": "image_url",
        "image_url": {
          "url": f"data:image/jpeg;base64,{image_base64}"
        },
      }, ],
    }],
  )
  print(response.choices[0].message.content)
  return response


async def test():
  client = Fireworks(api_key=os.getenv("FIREWORKS_API_KEY"))
  response = client.chat.completions.create(
  model=model_llama,
  messages=[{
    "role": "user",
    "content": "Say this is a test",
  }],
  )

  print(response.choices[0].message.content)

  return response