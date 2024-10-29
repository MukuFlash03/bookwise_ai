'use client'

import { SelectedPagesResponse } from '@/lib/types/pages';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { PageDataCell } from './PageDataCell';
import { readPages, createNote } from '@/lib/operations/apiCalls';
import React, { useState, useEffect, useTransition } from 'react';
import CustomSubmitButton from '@/components/CustomSubmitButton'
import { createClient } from "@/utils/supabase/client";
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

export function TablePages({ book_id }: SelectedBooksUsersResponse) {
  const [pagesResponseData, setPagesResponseData] = useState<SelectedPagesResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition()
  const [selectedPageIds, setSelectedPageIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    const loadData = async () => {
      try {
        const data = await readPages({ book_id: book_id });
        setPagesResponseData(data.data);
        setLoading(false);
        setSelectAll(false);
        setSelectedPageIds([]);
      } catch (err) {
        setError(`Failed to fetch pages data: ${err}`);
        setLoading(false);
      }
    };

    fetchUser();
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!pagesResponseData) return <div>No list pages data available</div>;
  if (error) return <div>Error while fetching pages response data: {error}</div>;

  // console.log(pagesResponseData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(async () => {
      try {
        console.log("Generating notes for selected pages:", selectedPageIds);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API call
        const generateNoteResponse = await createNote({ book_id: book_id, page_ids: selectedPageIds });

        // console.log(`${filePath}}`);
      } catch (error) {
        console.error('Note generation failed:', error)
      }
    })
  }

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedPageIds(pagesResponseData.map(page => page.id));
    } else {
      setSelectedPageIds([]);
    }
    // console.log(selectAll);

    // console.log("selected PageIds: ", selectedPageIds);
  };

  const handleCheckboxChange = (pageId: string) => {
    setSelectedPageIds(prevSelected => {
      const updatedSelection = prevSelected.includes(pageId)
        ? prevSelected.filter(id => id !== pageId)
        : [...prevSelected, pageId];

      setSelectAll(updatedSelection.length === pagesResponseData.length);
      // console.log("selected PageIds: ", updatedSelection);

      return updatedSelection;
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <form onSubmit={(event) => handleSubmit(event)}>
          <CustomSubmitButton
            label={isPending ? 'Generating...' : 'Generate Notes'}
            onClick={() => startTransition(() => { })}
            isLoading={isPending}
            disabled={isPending || selectedPageIds.length === 0}
          />
        </form>
      </div>
      <Table>
        <TableCaption>A list of your pages.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagesResponseData
            .map((pageData) => (
              <TableRow key={pageData.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedPageIds.includes(pageData.id)}
                    onChange={() => handleCheckboxChange(pageData.id)}
                  />
                </TableCell>
                <PageDataCell data={pageData} field="id" />
                <PageDataCell data={pageData} field="image_base64" />
                <TableCell>
                  <Button asChild>
                    {/* <Link href={pageData.note_url}>Open Note</Link> */}
                    <Link href={`/dashboard/books/${book_id}/pages/${pageData.id}`}>Open Note</Link>
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
    </>
  )
}
