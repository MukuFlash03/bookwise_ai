import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { PageUploadForm } from '@/app/dashboard/books/[book_id]/pages/PageUploadForm';
import { TablePages } from '@/app/dashboard/books/[book_id]/pages/TablePages';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

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

  const { book_id } = params;

  // console.log("Book ID from params:", book_id);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
      <div className="py-10">
        Your Pages
      </div>
      <Button asChild>
        <Link href={`/dashboard/books/${book_id}`}>Return to Book</Link>
      </Button>
      <div>
        <PageUploadForm user_id={user.id} book_id={book_id} />
        <TablePages user_id={user.id} book_id={book_id} />
      </div>

    </main>
  )
}
