import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { book_id, image_base64 } = await request.json();

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

    const { data, error } = await supabase
      .from('bw_pages')
      .insert({ book_user_id, image_base64 })
      .select();

    if (error) throw error;

    return NextResponse.json({ message: 'Page created successfully', BookUserData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}