import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import Link from 'next/link';
// import CustomButton from '@/components/CustomSubmitButton';

interface NoteProps {
  params: {
    book_id: string;
    note_id: string;
  };
}

export default async function NoteView({ params }: NoteProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { book_id, note_id } = params;

  // console.log("Book ID from params:", book_id);
  // console.log("Note ID from params:", note_id);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
      <div className="flex flex-col items-center space-y-4 py-10">
        <p className="text-2xl font-semibold mb-2">Welcome to Notes!</p>
        <p className="text-center">You are now viewing note {note_id}</p>
        <Button asChild>
          <Link href={`/dashboard/books/${book_id}/pages/${note_id}`}>Visit its page image</Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/books/${book_id}/notes`}>Return to Notes</Link>
        </Button>
      </div>
    </main>
  )
}