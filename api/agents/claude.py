from dotenv import load_dotenv
import os
import anthropic
from db.operations import get_db_notes_context
from api.types.custom_types import NoteGenerationContext
import asyncio
import logging
logging.basicConfig(level=logging.INFO)

load_dotenv()

client = anthropic.Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY"),
)

claude3_sonnet_model = "claude-3-5-sonnet-20240620"

async def analyze_notes(user_id: str, book_id: str, page_id: str):
  logging.info("Analyzing notes...")
  print("Analyzing notes...")
  try:
      note_generation_context = get_db_notes_context(user_id, book_id, page_id)
      logging.info("Note generation context:", note_generation_context)
      logging.info("Attempting chat completion...")
      generated_note_response = await asyncio.create_task(get_chat_completion(note_generation_context))
      logging.info("Chat completion:", generated_note_response)
      return generated_note_response
  except Exception as e:
      logging.info(f"Error in analyze_notes: {e}")
      return None
  
async def get_chat_completion(note_generation_context: NoteGenerationContext):
  try:
      logging.info("Getting chat completion...")

      base64_image = note_generation_context["image_base64"]
      system_prompt = get_system_prompt(note_generation_context)
      user_prompt = get_user_prompt(note_generation_context)
    
      logging.info("About to define tools...")

      tools = get_tools()

      message_list = [
        {
            "role": "user",
            "content": [
                {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": base64_image}},
                {"type": "text", "text": user_prompt}
            ]
        }
      ]

      print("About to generate chat completion...")

      response = client.messages.create(
          model=claude3_sonnet_model,
          max_tokens=1024,
          system=system_prompt,
          messages=message_list,
          tools=[tools],
          tool_choice={"type": "tool", "name": "analyze_notes"}
      )

      print("About to log tool use response...")

      print("Chat completion:", response)

      # """
      for tool_use_response in response.content:
          if tool_use_response.type == "tool_use" and tool_use_response.name == "analyze_notes":
              return tool_use_response.input
      # """

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

    Your output should be formatted as follows:

    Book: [Title] by [Author]

    Note Title: [Title of page or notes based on page context]

    Page Content Summary:
    [Provide an overall summary of the main points from the entire page content, about 7-8 bullet points. This content should have info from the entire page irrespective of whether the user has marked any notes on it or not.]

    User Notes Summary:
    [Summarize the key points from the user's handwritten notes, markings, highlights, max 4-5 bullet points. This should only focus on the user's notes and not the book content. The summarized content should not be verbatim but should capture the essence of the user's notes.]]

    Comparison and Analysis:
    [Briefly compare the user's notes to the book content, highlighting insights and assessing the notes' effectiveness, 4-5 sentences]

    Ensure your analysis is based on the information provided in the image text and the context of the book.
    Be objective and concise in your assessment.

    Match Percentage: 
    [Match percentage of how well the users notes aligns with matches the overalll summary. Should be between 0 and 100]

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

def get_tools():
  analyze_notes_tool = {
    "name": "analyze_notes",
    "description": "Converts and groups the text into a structured JSON object. The text will have data grouped into these sections: Book: [Title] by [Author], Book Content Summary, User Notes Summary, Comparison and Analysis, Match Percentage",
    "input_schema": {
      "type": "object",
      "properties": {
        "title": { "type": "string", "description": "Title of the book" },
        "author": { "type": "string", "description": "Author of the book" },
        "note_title": { "type": "string", "description": "High-level title for the note based on the page content. 10 words max." },
        "page_content_summary": {
          "type": "array",
          "items": { "type": "string" },
          "description": 'Array of bullet points for the entire page summary. Each array element represents a separate bullet point. 10 bullet points max. Combine bullet points if exceeding limit.'
        },
        "user_notes_summary": {
          "type": "array",
          "items": { "type": "string" },
          "description": 'Array of bullet points for users summarized notes. Each array element represents a separate bullet point. 10 bullet points max. Combine bullet points if exceeding limit.'
        },
        "comparison_analysis": { "type": "string", "description": "Compare and contrast the page summary with the users notes. Identify any missing points in the users notes. One or two paragraphs max." },
        "match_percentage": { "type": "number", "description": "Coherence of how well the users notes aligns with matches the overall summary. Should be between 0 and 100" },
      },
      "required": ['title', 'author', 'note_title', 'page_content_summary', 'user_notes_summary', 'comparison_analysis', 'match_percentage']
    }
  }

  return analyze_notes_tool
