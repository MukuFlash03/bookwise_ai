import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { user_id, title, author } = await request.json();

    const supabase = createClient();
    const { data, error } = await supabase
      .from('bw_books')
      .insert({ user_id, title, author })
      .select();

    if (error) throw error;

    const book_id = data[0].id;

    const { data: bookUserData, error: bookUserError } = await supabase
      .from('bw_books_users')
      .insert({ user_id, book_id });

    if (bookUserError) throw error;

    return NextResponse.json({ message: 'Book created successfully', data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}