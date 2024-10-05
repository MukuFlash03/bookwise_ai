import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from('bw_books')
      .select()
      .eq('user_id', user_id)

    if (error) throw error;

    return NextResponse.json({ message: 'Books fetched successfully', data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}
