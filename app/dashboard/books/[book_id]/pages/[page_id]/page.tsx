'use client';

import { createClient } from '@/utils/supabase/client';
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
// import CustomButton from '@/components/CustomSubmitButton';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PageProps {
  params: {
    book_id: string;
    page_id: string;
  };
}

export default function PageView({ params }: PageProps) {
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

  const { book_id, page_id } = params;

  // console.log("Book ID from params:", book_id);
  // console.log("Page ID from params:", page_id);

  useEffect(() => {
    const fetchUserAndLoadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return redirect('/login');
      }

      setUser(user);

      // const user_id = user.id;
    };

    fetchUserAndLoadData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
      <div className="flex flex-col items-center space-y-4 py-10">
        <p className="text-2xl font-semibold mb-2">Welcome to Pages!</p>
        <p className="text-center">You are now viewing page {page_id}</p>
        <Button asChild>
          <Link href={`/dashboard/books/${book_id}/notes/${page_id}`}>Visit its note image</Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/books/${book_id}/pages`}>Return to Pages</Link>
        </Button>
      </div>
    </main>
  )
}