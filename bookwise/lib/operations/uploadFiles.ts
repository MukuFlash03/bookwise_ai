'use server'

import { writeFile, readFile, readdir } from 'fs/promises'
import { join, parse } from 'path'
import { SelectedPagesResponse } from '../types/pages'
import { SelectedBooksUsersResponse } from "@/lib/types/books_users";
import { NotesResponse } from '@/lib/types/notes';
import { BookDetails } from '@/lib/types/books';
import path from 'path';
import { NoteTextFile } from '@/lib/types/files'
import { KGInput, WCInput } from '@/lib/types/pages_notes';


export async function uploadFile(data: FormData) {
  console.log("Inside uploadFile");

  const file: File | null = data.get('file') as unknown as File
  if (!file) {
    throw new Error('No file uploaded')
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  console.log("Filename: ", file.name);


  const rootDir = process.cwd();
  // const path = join(rootDir, 'src', 'lib', 'data', 'pages', file.name);
  const path = join(rootDir, 'lib', 'data', 'pages', file.name);
  console.log("Path:", path);

  console.log("Before commented out writeFile...");
  await writeFile(path, buffer)
  console.log(`open ${path} to see the uploaded file`)

  console.log("After commented out writeFile...");
  console.log("Attempting to save to Supabase Storage...");

  return { filePath: path, success: true }
}

export async function convertToBase64(filePath: string) {
  const fileBuffer = await readFile(filePath);
  return Buffer.from(fileBuffer).toString('base64');
};

export async function getHtmlContent() {
  const filePath = join(process.cwd(), 'public', 'template.html');
  const htmlContent = await readFile(filePath, 'utf-8');
  return htmlContent;
}

export async function saveToText(notesData: NotesResponse[], bookDetails: BookDetails) {
  let content = `Book Title: ${bookDetails.title}\nBook Author: ${bookDetails.author}\n\n---------\n\n`;

  for (const note of notesData) {
    content += `${note.id}\n\n`;
    content += `Note Title\n${note.note_title}\n\n`;
    content += `Page Content Summary\n${note.page_content_summary.join('\n')}\n\n`;
    content += `User Notes Summary\n${note.user_notes_summary.join('\n')}\n\n`;
    content += `Comparison Analysis\n${note.comparison_analysis}\n\n`;
    content += `Match Percentage\n${note.match_percentage}\n\n`;
    content += `-------------\n\n`;
  }

  const fileName = `${bookDetails.title.replace(/\s+/g, '_')}_notes.txt`;
  const filePath = path.join(process.cwd(), 'public', 'notes', fileName);

  await writeFile(filePath, content, 'utf-8');

  return { fileName, filePath };
}

export async function copyTextToAgents(textFile: NoteTextFile) {
  // const response = await fetch(`http://127.0.0.1:8000/copy-text-file`, {
  const response = await fetch(`http://127.0.0.1:8000/e2b-upload-file`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(textFile),
  });

  if (!response.ok) {
    throw new Error('Failed to copy file to Python app');
  }

  return response.json();
}

export async function generateWCFromText(wCInput: WCInput) {
  // const response = await fetch(`http://127.0.0.1:8000/generate-knowledge-graph`, {
  const response = await fetch(`http://127.0.0.1:8000/e2b-generate-wc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wCInput),
  });

  if (!response.ok) {
    throw new Error('Failed to generate knowledge graph');
  }

  return response.json();
}

export async function copyHTMLFromAgents(kgInput: KGInput) {
  // const response = await fetch(`http://127.0.0.1:8000/copy-html-file`, {
  const response = await fetch(`http://127.0.0.1:8000/e2b-download-file`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(kgInput),
  });

  if (!response.ok) {
    throw new Error('Failed to copy file from Python app');
  }

  return response.json();
}
