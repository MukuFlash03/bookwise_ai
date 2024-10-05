'use client'

import React, { useState, useEffect } from 'react';
import { SelectedNotesResponse, NotesResponse } from '@/lib/types/notes';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { NoteDataCell } from './NoteDataCell';
import { SelectedBooksUsersResponse } from '@/lib/types/books_users';

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
import { readNotes } from '@/lib/operations/apiCalls';

export function TableNotes({ user_id, book_id }: SelectedBooksUsersResponse) {
  const [notesResponseData, setNotesResponseData] = useState<NotesResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await readNotes({ user_id: user_id, book_id: book_id });
        setNotesResponseData(data.data);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch notes data: ${err}`);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!notesResponseData) return <div>No list notes data available</div>;
  if (error) return <div>Error while fetching notes response data: {error}</div>;

  // console.log(notesResponseData);

  return (

    <Table>
      <TableCaption>A list of your notes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Note Title</TableHead>
          <TableHead>Page Contents</TableHead>
          <TableHead>Reader Notes Contents</TableHead>
          <TableHead>Comparison Analysis</TableHead>
          <TableHead>Match Percentage</TableHead>
          <TableHead>Page</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notesResponseData
          .map((noteData) => (
            <TableRow key={noteData.id}>
              <NoteDataCell data={noteData} field="id" />
              <NoteDataCell data={noteData} field="note_title" />
              <NoteDataCell data={noteData} field="page_content_summary" />
              <NoteDataCell data={noteData} field="user_notes_summary" />
              <NoteDataCell data={noteData} field="comparison_analysis" />
              <NoteDataCell data={noteData} field="match_percentage" />
              <TableCell>
                <Button asChild>
                  {/* <Link href={noteData.page_url}>Open Page</Link> */}
                  <Link href={`/dashboard/books/${book_id}/notes/${noteData.id}`}>Open Page</Link>
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
