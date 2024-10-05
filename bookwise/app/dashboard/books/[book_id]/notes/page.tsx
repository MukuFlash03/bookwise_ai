import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { TableNotes } from './TableNotes';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { BookDetails } from '@/lib/types/books';
import { readBookDetails } from '@/lib/operations/apiCalls';

interface PageProps {
  params: {
    book_id: string;
  };
}

export default async function Library({ params }: PageProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const user_id = user.id;
  const { book_id } = params;

  const bookDetailsData = await readBookDetails({ user_id, book_id });
  const bookDetails: BookDetails = {
    title: bookDetailsData.data[0].title,
    author: bookDetailsData.data[0].author
  }
  console.log(bookDetails);

  // console.log("Book ID from params:", book_id);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
      <div className="py-10">
        Your Notes from {bookDetails.title} by {bookDetails.author}
      </div>
      <Button asChild>
        <Link href={`/dashboard/books/${book_id}`}>Return to Book</Link>
      </Button>
      <div>
        <TableNotes user_id={user.id} book_id={book_id} />
      </div>

    </main>
  )
}
