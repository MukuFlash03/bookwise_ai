'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { SelectedBooksUsersResponse } from '@/lib/types/books_users';
import { createKnowledgeGraph } from '@/lib/operations/apiCalls';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { redirect, useRouter } from "next/navigation";


interface BookProps {
  params: {
    book_id: string;
  };
}

export default function Visualize({ params }: BookProps) {
  const [graphFilename, setGraphFilename] = useState('template.html');
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState<any>(null);

  const searchParams = useSearchParams();
  const user_id = searchParams.get('user_id') as string;
  const book_id = params.book_id;

  const supabase = createClient();

  /*
  useEffect(() => {
    if (isGenerating) {
      createKnowledgeGraph({ user_id, book_id })
        .then(result => {
          console.log('Knowledge graph created successfully', result);
          if (result.copyHTMLResponse.fileInfo.fileName) {
            setGraphFilename(result.copyHTMLResponse.fileInfo.fileName);
          }
        })
        .catch(error => {
          console.error("Error creating knowledge graph:", error);
        })
        .finally(() => {
          setIsGenerating(false);
        });
    }
  }, [isGenerating, user_id, book_id]);
  */

  useEffect(() => {
    const generateKnowledgeGraph = async () => {
      if (!isGenerating) return;

      try {
        // First fetch the user
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          return redirect('/login');
        }

        setUser(user);

        // Then create knowledge graph with user data
        const result = await createKnowledgeGraph({ book_id });
        console.log('Knowledge graph created successfully', result);

        if (result.copyHTMLResponse.fileInfo.fileName) {
          setGraphFilename(result.copyHTMLResponse.fileInfo.fileName);
        }
      } catch (error) {
        console.error("Error creating knowledge graph:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateKnowledgeGraph();
  }, [isGenerating, book_id]); // Removed user_id from dependencies since we're fetching it

  /*
  const handleSubmit = async (book_user: SelectedBooksUsersResponse) => {
    console.log("Handling submit...");

    try {
      const result = await createKnowledgeGraph(book_user);
      console.log('Knowledge graph created successfully', result);
      console.log(result);
      if (result.copyHTMLResponse.fileInfo.fileName) {
        setGraphFilename(result.copyHTMLResponse.fileInfo.fileName);
        console.log("Graph HTML Filename");
        console.log(result.copyHTMLResponse.fileInfo.fileName);
      }
    } catch (error) {
      console.error("Error creating knowledge graph:", error);
    }
  };
  */

  const handleSubmit = () => {
    setIsGenerating(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
      <div className="py-10 space-x-4">
        {/* <Button type="submit"
          onClick={() => handleSubmit({ user_id, book_id })}>
          Generate Knowledge Graph
        </Button> */}
        <Button type="submit" onClick={handleSubmit} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Word Cloud'}
          {/* {isGenerating ? 'Generating...' : 'Generate Knowledge Graph'} */}
        </Button>
        {/* <Button asChild>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/generated_kg_html/${graphFilename}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
            View Knowledge Graph
          </Link>
        </Button> */}
        <Button asChild disabled={isGenerating}>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/generated_kg_html/${graphFilename}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
            View Knowledge Graph
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/books/${book_id}`}>Return to Book</Link>
        </Button>
      </div>
    </main>
  )
}
