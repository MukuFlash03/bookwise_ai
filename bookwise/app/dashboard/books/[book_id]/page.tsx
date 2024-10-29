'use client';

import { createClient } from '@/utils/supabase/client';
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
// import CustomButton from '@/components/CustomSubmitButton';
import Link from 'next/link';
import { readBookDetails } from '@/lib/operations/apiCalls';
import { BookDetails } from '@/lib/types/books';
import { useEffect, useState } from 'react';


interface BookProps {
  params: {
    book_id: string;
  };
}

export default function BookView({ params }: BookProps) {
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

  const { book_id } = params;

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

      try {
        const bookDetailsData = await readBookDetails({ book_id });
        // console.log("Book ID from params:", book_id);

        setBookDetails({
          title: bookDetailsData.data[0].title,
          author: bookDetailsData.data[0].author
        });

        console.log(bookDetails);
      } catch (err) {
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndLoadData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !bookDetails) {
    return <div>Error: {error || 'Failed to load data'}</div>;
  }


  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
      <div className="py-10">
        {bookDetails.title} by {bookDetails.author}
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-center space-x-24 font-mono text-sm lg:flex">
        <Button asChild>
          <Link href={`/dashboard/books/${book_id}/visuals?user_id=${user.id}`}>Visuals</Link>
          {/* <Link href={`/dashboard/books/${book_id}/visuals`}>Visuals</Link> */}
        </Button>
        <Button asChild>
          <Link href={`/dashboard/books/${book_id}/notes`} className="hover:underline">Notes</Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/books/${book_id}/pages`} className="hover:underline">Pages</Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard`} className="hover:underline">Return to Library</Link>
        </Button>
      </div>
    </main>
  )
}