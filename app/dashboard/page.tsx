'use client';

import { createClient } from '@/utils/supabase/client';
import { redirect } from "next/navigation";
import { TableBooks } from './TableBooks';
import CreateBookDialog from './CreateBookDialog';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { signout } from "@/lib/operations/auth-actions";


export default function Library() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    try {
      const fetchUserAndLoadData = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          return redirect('/login');
        }

        setUser(user);

        console.log("User:", user);
        console.log("User ID:", user.id);
        console.log("User full name:", user.user_metadata.full_name);
        console.log("User email:", user.email);

        // const user_id = user.id;
      };

      fetchUserAndLoadData();
    } catch (err) {
      setError('Failed to fetch user');
    } finally {
      setLoading(false);
    }

  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
      <div className="py-10">
        Your Library
      </div>
      <div className="flex flex-row space-x-4">
        <CreateBookDialog user_id={user.id} />
        <Button asChild>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/generated_kg_html/template.html`} className="hover:underline" target="_blank" rel="noopener noreferrer">
            View Knowledge Graph
          </Link>
        </Button>
        <Button
          onClick={() => {
            signout();
            setUser(null);
          }}
        >
          Log out
        </Button>
      </div>
      <div>
        <TableBooks user_id={user.id} />
      </div>

    </main>
  )
}
