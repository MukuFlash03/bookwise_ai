import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // const user_id = searchParams.get('user_id');
    const book_id = searchParams.get('book_id');

    // if (!user_id || !book_id) {
    //   return NextResponse.json({ error: 'User ID and Book ID are required' }, { status: 400 });
    // }


    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const reader_id = user?.id;
    console.log("Reader ID:", reader_id);


    const { data: BookUserData, error: BookUserError } = await supabase
      .from('bw_books_users')
      .select()
      .eq('user_id', reader_id)
      .eq('book_id', book_id)
      ;

    console.log("Book User Data:", BookUserData);

    if (!BookUserData || BookUserData.length === 0) {
      throw new Error('No matching book user data found');
    }

    const book_user_id = BookUserData[0].id;

    // console.log("Book user id;", book_user_id);

    if (BookUserError) throw BookUserError;

    const { data, error } = await supabase
      .from('bw_notes')
      .select()
      .eq('book_user_id', book_user_id)

    if (error) throw error;

    return NextResponse.json({ message: 'Notes fetched successfully', data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}
