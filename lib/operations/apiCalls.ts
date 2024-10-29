// 'use server'

import { BookUserDetails } from "@/lib/types/books";
import { UserCreate, UserCreateGoogle } from "@/lib/types/users";
import { PageDetails, MultiplePageIds } from "@/lib/types/pages";
// import { createClient } from '@/utils/supabase/server';
import { SelectedBooksUsersResponse } from "@/lib/types/books_users";

/* Get User */
// export async function getUser() {
//   const supabase = createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     console.log("No user found");
//     return null;
//   }

//   return user;
// }
/* Create Operations */

export async function createUser(user: UserCreate) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Failed to create user in apiCalls');
  }

  return response.json();
}

export async function createBook(book: BookUserDetails) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error('Failed to create book');
  }

  return response.json();
}

export async function createPage(page: PageDetails) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(page),
  });

  if (!response.ok) {
    throw new Error('Failed to create page');
  }

  return response.json();
}

export async function createNote(multiPages: MultiplePageIds) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(multiPages),
  });

  if (!response.ok) {
    throw new Error('Failed to create note');
  }

  return response.json();
}

export async function createKnowledgeGraph(book_user: SelectedBooksUsersResponse) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-knowledge-graph`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book_user),
  });

  if (!response.ok) {
    throw new Error('Failed to create knowledge graph');
  }

  return response.json();
}


/*  ----------------------------------------------------  */

/* Read Operations */

// export async function readBooks(user_id: string) {
export async function readBooks() {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/read-books?user_id=${encodeURIComponent(user_id)}`, {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/read-books`, {

  // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/read-books`, {
  const response = await fetch('/api/read-books', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error('Failed to fetch books from database.');
  }

  return response.json();
}

export async function readPages({ book_id }: SelectedBooksUsersResponse) {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/read-pages?book_id=${encodeURIComponent(book_id)}`, {
  const response = await fetch(`/api/read-pages?book_id=${book_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    console.log(response);
    throw new Error('Failed to fetch pages from database.');
  }
  return response.json();
}

export async function readNotes({ book_id }: SelectedBooksUsersResponse) {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/read-notes?book_id=${encodeURIComponent(book_id)}`, {
  const response = await fetch(`/api/read-notes?book_id=${book_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error('Failed to fetch notes from database.');
  }

  return response.json();
}


export async function readBookDetails({ book_id }: SelectedBooksUsersResponse) {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/read-book-details?book_id=${encodeURIComponent(book_id)}`, {
  const response = await fetch(`/api/read-book-details?book_id=${book_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });


  if (!response.ok) {
    console.log(response);
    throw new Error('Failed to fetch book details from database.');
  }
  return response.json();
}
