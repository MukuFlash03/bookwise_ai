'use client'

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createBook } from '@/lib/operations/apiCalls';
import { BookUserDetails } from '@/lib/types/books';
import { useState } from 'react';

export default function CreateBookDialog({ user_id }: { user_id: string }) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")

  const handleSubmit = async (book: BookUserDetails) => {
    try {
      // console.log("Book details:", user_id, title, author);

      const book: BookUserDetails = {
        user_id: user_id,
        title: title,
        author: author
      };
      const result = await createBook(book);
      console.log('Book added successfully', result);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add a Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Book</DialogTitle>
          <DialogDescription>
            Add a new book to your library. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              // defaultValue="Atomic Habits"
              className="col-span-3"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              Author
            </Label>
            <Input
              id="author"
              // defaultValue="James Clear"
              className="col-span-3"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit"
            onClick={() => handleSubmit({ user_id, title, author })}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
