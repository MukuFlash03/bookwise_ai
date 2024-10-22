import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  console.log("Trying to create user in create-users route")
  try {
    const { user_id, email, name } = await request.json();

    const supabase = createClient();
    const { data, error } = await supabase
      .from('bw_users')
      .insert({ user_id, email, name });

    console.log("User inserted in create-users route; error?")

    if (error) throw error;

    console.log("User created successfully in create-users route after error check")

    return NextResponse.json({ message: 'User created successfully', data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user in create-users' }, { status: 500 });
  }
}