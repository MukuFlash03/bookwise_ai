import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // const { searchParams } = new URL(request.url);
    // const user_id = searchParams.get('user_id');
    // const book_id = searchParams.get('book_id');

    // if (!user_id) {
    //   return NextResponse.json({ error: 'User ID and Book ID are required' }, { status: 400 });
    // }

    const book_id = request.nextUrl.searchParams.get('book_id');
    console.log("Book ID in GET route:", book_id);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("User not authenticated in GET route read-book-details");

      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const reader_id = user?.id;

    const { data, error: BookDetailsError } = await supabase
      .from('bw_books')
      .select("title, author")
      .eq('user_id', reader_id)
      .eq('id', book_id)

    if (BookDetailsError) throw BookDetailsError;

    return NextResponse.json({ message: 'Books fetched successfully', data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch books details' }, { status: 500 });
  }
}
