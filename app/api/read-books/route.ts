import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
// import { getUser } from '@/lib/operations/apiCalls';
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // const { searchParams } = new URL(request.url);
    // const user_id = searchParams.get('user_id');

    // if (!user_id) {
    //   return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    // }

    const supabase = createClient();

    // console.log("Before fetching user in GET read-books");
    // const user1 = await getUser()
    // console.log("User in GET read-books:", user1);
    // console.log("After fetching user in GET read-books");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated in GET route read-books' }, { status: 401 });
    }

    const reader_id = user?.id;

    const { data, error: BooksError } = await supabase
      .from('bw_books')
      .select()
      .eq('user_id', reader_id);

    if (BooksError) throw BooksError;

    console.log("Fetched books data:", data);

    return NextResponse.json({ message: 'Books data fetched successfully', data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch books data' }, { status: 500 });
  }
}