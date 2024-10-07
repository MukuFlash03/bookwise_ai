import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { NoteGenerationContext } from '@/lib/types/pages_notes';
import Groq from "groq-sdk";
import Anthropic from '@anthropic-ai/sdk';
import { SelectedNotesResponse } from '@/lib/types/notes';
import { PageDetailsID } from '@/lib/types/pages_notes';

export async function POST(request: Request) {
  try {
    const { user_id, book_id, page_ids } = await request.json();

    const supabase = createClient();

    const { data: BookUserData, error: BookUserError } = await supabase
      .from('bw_books_users')
      .select()
      .eq('user_id', user_id)
      .eq('book_id', book_id)
      ;

    if (!BookUserData || BookUserData.length === 0) {
      throw new Error('No matching book user found');
    }

    if (BookUserError) throw BookUserError;

    const book_user_id = BookUserData[0].id;

    console.log("Before asking LLM to generate notes");


    const notesPromises = page_ids.map(async (page_id: string) => {
      // const noteResponse = await analyzeNotes({ user_id: user_id, book_id: book_id, page_id: page_id });
      const noteResponse = await generateNotes({ user_id: user_id, book_id: book_id, page_id: page_id });
      console.log("Note content response:", noteResponse);
      // const noteResponseJson = await noteResponse.json();
      // console.log("Note content:", noteResponseJson);

      const noteToInsert: SelectedNotesResponse = {
        book_user_id: book_user_id,
        note_title: noteResponse.generated_notes.note_title,
        page_content_summary: noteResponse.generated_notes.page_content_summary,
        user_notes_summary: noteResponse.generated_notes.user_notes_summary,
        comparison_analysis: noteResponse.generated_notes.comparison_analysis,
        match_percentage: noteResponse.generated_notes.match_percentage,
      }

      console.log("Note to insert:", noteToInsert);

      const { data, error } = await supabase
        .from('bw_notes')
        .insert(noteToInsert)
        .select();

      if (error) throw error;

      const note_id = data[0].id;

      const { data: pageNoteData, error: pageNoteError } = await supabase
        .from('bw_pages_notes')
        .insert({ page_id, note_id });

      if (pageNoteError) throw error;

    });

    const createdNotes = await Promise.all(notesPromises);
    // const createdNotes = "Hello";

    return NextResponse.json({ message: 'Notes created successfully', createdNotes });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notes' }, { status: 500 });
  }
}

async function generateNotes(pageDetailsID: PageDetailsID) {
  const { user_id, book_id, page_id } = pageDetailsID;
  // const response = await fetch(`http://127.0.0.1:8000/generate-notes?user_id=${user_id}&book_id=${book_id}&page_id=${page_id}`, {
  const response = await fetch(`http://127.0.0.1:8000/generate-notes-claude?user_id=${user_id}&book_id=${book_id}&page_id=${page_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch generated notes');
  }

  const generatedNoteResponse = await response.json();
  console.log("Generated note response:");
  console.log(generatedNoteResponse);
  console.log("********************************************");

  return generatedNoteResponse;

  // return NextResponse.json({ message: 'Note generated from page image content successfully', generatedNoteResponse });
}

/*
export async function analyzeNotes({
  user_id, book_id, page_id
}: {
  user_id: string, book_id: string, page_id: string
}) {
  try {
    const supabase = createClient();
    const { data: BookData, error: BookError } = await supabase
      .from('bw_books')
      .select()
      .eq('id', book_id)

    const { data: PageData, error: PageError } = await supabase
      .from('bw_pages')
      .select()
      .eq('id', page_id)

    const noteGenerationContext: NoteGenerationContext = {
      title: BookData[0].title,
      author: BookData[0].author,
      image_base64: PageData[0].image_base64,
    }

    // console.log("Note generation context:", noteGenerationContext);

    console.log("Attempting chat completion...");
    const generatedNoteResponse = await getChatCompletion(noteGenerationContext);
    // console.log("Chat completion:", generatedNoteResponse);

    return NextResponse.json({ message: 'Note generated from page image content successfully', generatedNoteResponse });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate questions from PDF' }, { status: 500 });
  }
}


export const getChatCompletion = async (noteContext: NoteGenerationContext) => {
  console.log("Getting chat completion...");

  const claude3_sonnet_model = "claude-3-5-sonnet-20240620"

  const base64_image = noteContext.image_base64
  const systemPrompt = getSystemPrompt(noteContext)
  const userPrompt = getUserPrompt(noteContext)

  const anthropicClient = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  console.log("About to define tools...");

  const tools = getTools()

  console.log("About to generate chat completion...");

  const chatCompletion = await anthropicClient.messages.create({
    model: claude3_sonnet_model,
    max_tokens: 1024,
    system: systemPrompt,
    tools: tools,
    tool_choice: { "type": "tool", "name": "analyze_notes" },
    messages: [{
      role: "user",
      content: [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/png',
            data: base64_image,
          }
        },
        {
          type: 'text',
          text: userPrompt,
        },
      ],
    }],
  });

  // console.log(chatCompletion.content);

  console.log("About to log tool use reponse...");

  for (const toolUseResponse of chatCompletion.content) {
    if (toolUseResponse.type === "tool_use" && toolUseResponse.name === "analyze_notes") {
      const input = toolUseResponse.input;
      // console.log("Input:", input);
      return input;
    }
  }

  return "Hello world";
};

function getSystemPrompt(noteContext: NoteGenerationContext) {
  const systemPrompt = `
    You are an AI assistant specialized in analyzing handwritten notes and book content.
    You will be provided with text extracted from an image of a book page with handwritten notes, along with the book's title and author.
    Your task is to analyze this information and provide a summary of both the book content and the user's notes, considering the context of the entire book.

    I will give you the following information:
    - Book Title: ${noteContext.title}
    - Book Author: ${noteContext.author}

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
    [Provide a concise summary of the main points from the page content, max 5-6 bullet points]

    User Notes Summary:
    [Summarize the key points from the user's handwritten notes, markings, highlights, max 5-6 bullet points]

    Comparison and Analysis:
    [Briefly compare the user's notes to the book content, highlighting insights and assessing the notes' effectiveness, 4-5 sentences]

    Ensure your analysis is based on the information provided in the image text and the context of the book.
    Be objective and concise in your assessment.

    Match Percentage: 
    [Match percentage of how well the users notes aligns with matches the overalll summary. Should be between 0 and 100]

    Important: Provide only the output in the exact format specified above. Do not include any additional text, explanations, or commentary before or after the requested output.
  `
  return systemPrompt
}

function getUserPrompt(noteContext: NoteGenerationContext) {
  const userPrompt = `
    I am giving you the image of a page in a book that I was reading. I like to make notes so that I can really imbibe the content and learnings. 
    But you see if I don't revisit or reread the book I will forget the learnings. 
    So, I want you to look at my marking, highlighting, underlining patterns in the image and then extract the relevant notes from the book's text on the given page.
    This won't be an exact match of the summary of the page. I marked what I personally found important that may or may not match what you would include in the summary. 
    Also, give a side by side comparison of the "short summary that you would generate from the text as a whole" versus "the notes I have marked".

    I will give you the following information:
    - Book Title: ${noteContext.title}
    - Book Author: ${noteContext.author}
  `
  return userPrompt
}

function getTools() {
  const tools: Anthropic.Tool[] = [
    {
      "name": "analyze_notes",
      "description": "Converts and groups the text into a structured JSON object. The text will have data grouped into these sections: Book: [Title] by [Author], Book Content Summary, User Notes Summary, Comparison and Analysis",
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
  ]

  return tools
}

*/
