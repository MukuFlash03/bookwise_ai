'use client'

import React, { useState, useEffect } from 'react';
import { SelectedBooksResponse } from '@/lib/types/books';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { BookDataCell } from './BookDataCell';
import { readBooks } from '@/lib/operations/apiCalls';
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface PageProps {
  user_id: string;
}

export function TableBooks({ user_id }: PageProps) {
  const [booksResponseData, setBooksResponseData] = useState<SelectedBooksResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  console.log("Inside TableBooks");
  console.log("user_id:", user_id);

  const supabase = createClient();
  const router = useRouter();


  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    // if (!user) {
    //   router.push('/login');
    // }

    const loadData = async () => {
      try {
        // const data = await readBooks(user_id);
        const data = await readBooks();
        console.log("Data in TableBooks useEffect:", data);
        setBooksResponseData(data.data);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch books data: ${err}`);
        setLoading(false);
      }
    };

    fetchUser();
    loadData();
  }, []);

  console.log("Before return in TableBooks");
  console.log("user:", user);

  if (loading) return <div>Loading...</div>;
  if (!booksResponseData) return <div>No list books data available</div>;
  if (error) return <div>Error while fetching list of books response data: {error}</div>;

  console.log(booksResponseData);



  return (

    <Table>
      <TableCaption>A list of your books.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>View Book</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {booksResponseData
          .map((bookData) => (
            <TableRow key={bookData.id}>
              <BookDataCell data={bookData} field="id" />
              <BookDataCell data={bookData} field="title" />
              <BookDataCell data={bookData} field="author" />
              <TableCell>
                <Button asChild>
                  <Link href={`/dashboard/books/${bookData.id}`}>Open Book</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      {/* <TableFooter>
							<TableRow>
									<TableCell colSpan={3}>Total</TableCell>
									<TableCell className="text-right">$2,500.00</TableCell>
							</TableRow>
					</TableFooter> */}
    </Table>
  )
}
