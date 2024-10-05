import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { user_id, email, name } = await request.json();

    const supabase = createClient();
    const { data, error } = await supabase
      .from('bw_users')
      .insert({ user_id, email, name });

    if (error) throw error;

    return NextResponse.json({ message: 'User created successfully', data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}