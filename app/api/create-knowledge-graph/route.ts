import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { readNotes, readBookDetails } from '@/lib/operations/apiCalls';
import { BookDetails } from '@/lib/types/books';
import { saveToText, copyTextToAgents, generateWCFromText, copyHTMLFromAgents } from '@/lib/operations/uploadFiles';
import { KGInput, WCInput } from '@/lib/types/pages_notes';

export async function POST(request: Request) {
  try {
    const { book_id } = await request.json();

    const supabase = createClient();

    const notesData = await readNotes({ book_id });

    const bookDetailsData = await readBookDetails({ book_id });
    const bookDetails: BookDetails = {
      title: bookDetailsData.data[0].title,
      author: bookDetailsData.data[0].author
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const user_id = user.id;

    const kgInput: KGInput = {
      user_id,
      book_ids: [book_id],
    }

    const wCInput: WCInput = {
      user_id,
      book_id,
      title: bookDetailsData.data[0].title,
      author: bookDetailsData.data[0].author
    }

    const saveTextResponse = await saveToText(notesData.data, bookDetails);
    // console.log(saveTextResponse);

    const copyTextFileResponse = await copyTextToAgents(saveTextResponse);
    console.log(copyTextFileResponse);

    const generateWCResponse = await generateWCFromText(wCInput);
    console.log(generateWCResponse);

    const copyHTMLResponse = await copyHTMLFromAgents(kgInput);
    console.log(copyHTMLResponse);

    return NextResponse.json({ message: 'Knowledge graph created successfully', copyHTMLResponse });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create knowledge graph' }, { status: 500 });
  }
}
