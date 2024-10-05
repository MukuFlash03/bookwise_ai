import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
// import CustomButton from '@/components/CustomSubmitButton';
import Link from 'next/link';
import { readBookDetails } from '@/lib/operations/apiCalls';
import { BookDetails } from '@/lib/types/books';

interface BookProps {
  params: {
    book_id: string;
  };
}

export default async function BookView({ params }: BookProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const user_id = user.id;
  const book_id = params.book_id;

  const bookDetailsData = await readBookDetails({ user_id, book_id });
  const bookDetails: BookDetails = {
    title: bookDetailsData.data[0].title,
    author: bookDetailsData.data[0].author
  }

  // console.log("Book ID from params:", bookId);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
      <div className="py-10">
        {bookDetails.title} by {bookDetails.author}
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-center space-x-24 font-mono text-sm lg:flex">
        <Button asChild>
          <Link href={`/dashboard/books/${book_id}/visuals?user_id=${user_id}`}>Visuals</Link>
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