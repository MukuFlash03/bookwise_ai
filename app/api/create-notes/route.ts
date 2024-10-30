import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { NoteGenerationContext } from '@/lib/types/pages_notes';
import Groq from "groq-sdk";
import Anthropic from '@anthropic-ai/sdk';
import { SelectedNotesResponse } from '@/lib/types/notes';
import { PageDetailsID } from '@/lib/types/pages_notes';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (
//   process.env.NODE_ENV === 'development'
//     ? 'http://127.0.0.1:8000'
//     : 'https://bookwise-ai.vercel.app'
// );

// const API_BASE_URL = process.env.NODE_ENV === 'development'
//   ? 'http://127.0.0.1:8000'
//   : '';

export async function POST(request: Request) {
  console.log("=== POST Request Started ===");

  try {
    const { book_id, page_ids } = await request.json();
    console.log("Request payload:", { book_id, page_ids });

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const user_id = user?.id;

    if (!user_id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

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


    console.log("Starting note generation for pages:", page_ids);

    const notesPromises = page_ids.map(async (page_id: string) => {
      // const noteResponse = await analyzeNotes({ user_id: user_id, book_id: book_id, page_id: page_id });
      console.log(`Processing page ${page_id}`);
      const noteResponse = await generateNotes({ user_id: user_id, book_id: book_id, page_id: page_id });
      console.log(`Note response for page ${page_id}:`, noteResponse);
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
    console.log("All notes created successfully:", createdNotes);
    // const createdNotes = "Hello";

    return NextResponse.json({ message: 'Notes created successfully', createdNotes });
  } catch (error) {
    console.error("Detailed error in POST handler:", error);
    // return NextResponse.json({ error: 'Failed to create notes' }, { status: 500 });
    return NextResponse.json({
      error: 'Failed to create notes',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  } finally {
    console.log("=== POST Request Ended ===");
  }
}

async function generateNotes(pageDetailsID: PageDetailsID) {
  const MAX_RETRIES = 2;
  const INITIAL_TIMEOUT = 30000;

  console.log("Inside generateNotes route.ts");
  console.log("pageDetailsID: ", pageDetailsID);
  // console.log("API BASE URL: ", API_BASE_URL);

  const { user_id, book_id, page_id } = pageDetailsID;
  // const response = await fetch(`http://127.0.0.1:8000/generate-notes?user_id=${user_id}&book_id=${book_id}&page_id=${page_id}`, {
  // const response = await fetch(`http://127.0.0.1:8000/generate-notes-claude?user_id=${user_id}&book_id=${book_id}&page_id=${page_id}`, {
  // const response = await fetch(`http://127.0.0.1:8000/api/py/generate-notes-claude?user_id=${user_id}&book_id=${book_id}&page_id=${page_id}`, {

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    console.log(`=== Attempt ${attempt + 1} of ${MAX_RETRIES + 1} ===`);

    try {
      // const url = `${API_BASE_URL}/api/py/generate-notes-claude?user_id=${user_id}&book_id=${book_id}&page_id=${page_id}`;

      const url = process.env.NODE_ENV === 'development'
        ? `http://127.0.0.1:8000/api/py/generate-notes-claude?user_id=${user_id}&book_id=${book_id}&page_id=${page_id}`
        : `/api/py/generate-notes-claude?user_id=${user_id}&book_id=${book_id}&page_id=${page_id}`;

      console.log("Requesting URL:", url);

      const requestUrl = process.env.NODE_ENV === 'development'
        ? url
        : new URL(url, 'https://bookwise-ai.vercel.app').toString();

      console.log(`[Attempt ${attempt + 1}] Requesting URL:`, requestUrl);

      const controller = new AbortController();
      const timeout = INITIAL_TIMEOUT * (attempt + 1);
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(requestUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        console.log(`[Attempt ${attempt + 1}] Response status:`, response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`[Attempt ${attempt + 1}] Error response:`, errorText);
          throw new Error(`Failed to fetch generated notes: ${errorText}`);
        }

        const responseText = await response.text();
        console.log(`[Attempt ${attempt + 1}] Raw response:`, responseText);

        let generatedNoteResponse;
        try {
          generatedNoteResponse = JSON.parse(responseText);
        } catch (parseError) {
          console.error(`[Attempt ${attempt + 1}] Failed to parse JSON:`, parseError);
          throw new Error(`Invalid JSON response: ${responseText}`);
        }

        console.log(`[Attempt ${attempt + 1}] Parsed response:`, generatedNoteResponse);

        if (!generatedNoteResponse.generated_notes) {
          throw new Error('Response missing generated_notes field');
        }

        return generatedNoteResponse;

      } finally {
        clearTimeout(timeoutId);
      }

      // const response = await fetch(`${API_BASE_URL}/api/py/generate-notes-claude?user_id=${user_id}&book_id=${book_id}&page_id=${page_id}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // console.log("After fetching generated notes request");
      // console.log("Response status:", response.status);

      // if (!response.ok) {
      //   const errorText = await response.text();
      //   console.error("Error response:", errorText);
      //   console.error(`Attempt ${attempt + 1} failed:`, errorText);
      //   throw new Error(`Failed to fetch generated notes: ${errorText}`);
      // }

      // const generatedNoteResponse = await response.json();
      // console.log("Generated note response:");
      // console.log(generatedNoteResponse);
      // console.log("********************************************");

      // console.log("Success on attempt", attempt + 1);

      // return generatedNoteResponse;

    } catch (error: unknown) {
      console.error("Error in generateNotes:", error);
      console.error(`[Attempt ${attempt + 1}] Error:`, error);

      if (attempt === MAX_RETRIES) {
        throw error;
      }

      // if (error instanceof Error) {
      //   if (error.name === 'AbortError') {
      //     throw new Error('Request timed out after 50 seconds');
      //   }
      //   throw error;
      // }

      const delay = Math.pow(2, attempt) * 1000;
      console.log(`[Attempt ${attempt + 1}] Waiting ${delay}ms before retry`);
      await new Promise(resolve => setTimeout(resolve, delay));
      // await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));

    }
  }
}
