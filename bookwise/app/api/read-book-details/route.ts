import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const book_id = searchParams.get('book_id');

    if (!user_id) {
      return NextResponse.json({ error: 'User ID and Book ID are required' }, { status: 400 });
    }

    const supabase = createClient();
    const { data, error: BookDetailsError } = await supabase
      .from('bw_books')
      .select("title, author")
      .eq('user_id', user_id)
      .eq('id', book_id)

    if (BookDetailsError) throw BookDetailsError;

    return NextResponse.json({ message: 'Books fetched successfully', data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}
