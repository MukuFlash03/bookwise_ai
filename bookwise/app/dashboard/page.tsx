import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { TableBooks } from './TableBooks';
import CreateBookDialog from './CreateBookDialog';

export default async function Library() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // console.log("User:", user);
  // console.log("User ID:", user.id);
  // console.log("User full name:", user.user_metadata.full_name);
  // console.log("User email:", user.email);


  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
      <div className="py-10">
        Your Library
      </div>
      <CreateBookDialog user_id={user.id} />
      <div>
        <TableBooks user_id={user.id} />
      </div>

    </main>
  )
}
