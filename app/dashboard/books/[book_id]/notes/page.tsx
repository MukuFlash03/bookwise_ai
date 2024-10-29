'use client'

import { createClient } from '@/utils/supabase/client';
import { redirect, useRouter } from "next/navigation";
import { TableNotes } from './TableNotes';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { BookDetails } from '@/lib/types/books';
import { readBookDetails } from '@/lib/operations/apiCalls';
import { useEffect, useState } from 'react';

interface PageProps {
  params: {
    book_id: string;
  };
}

export default function Library({ params }: PageProps) {
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

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
        Your Notes from {bookDetails.title} by {bookDetails.author}
      </div>
      <Button asChild>
        <Link href={`/dashboard/books/${book_id}`}>Return to Book</Link>
      </Button>
      <div>
        <TableNotes book_id={book_id} />
      </div>

    </main>
  )
}
