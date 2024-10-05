import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createUser } from '@/lib/operations/apiCalls';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(new URL('/error', request.url));
    }

    const { user } = data;

    if (user) {
      await createUser({
        user_id: user.id,
        email: user.email ?? 'no-user@email.com',
        name: user.user_metadata.full_name || user.email || 'Unknown User',
      });

      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If there's no code or user, redirect to the login page
  return NextResponse.redirect(new URL('/login', request.url));
}
