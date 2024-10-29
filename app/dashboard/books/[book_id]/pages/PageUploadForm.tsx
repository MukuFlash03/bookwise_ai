'use client'

import { useTransition } from 'react'
import { uploadFile, convertToBase64 } from '@/lib/operations/uploadFiles'
import CustomSubmitButton from '@/components/CustomSubmitButton'
import React from 'react'
import { createPage } from '@/lib/operations/apiCalls';
import { PageDetails, PageUpload } from '@/lib/types/pages'

interface PageUploadFormProps {
  user_id: string;
  book_id: string;
}

export function PageUploadForm({ user_id, book_id }: PageUploadFormProps) {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(async () => {
      try {
        const book_page_file = {
          book_id: book_id,
          formData: formData,
        }
        // const { filePath } = await uploadFile(book_page_file)
        // const image_base64 = await convertToBase64(filePath);

        console.log("Calling uploadFile...");
        const BooksPagesBucketData = await uploadFile(book_page_file)
        console.log("Back from uploadFile...");
        console.log("BooksPagesBucketData:", BooksPagesBucketData);

        if (!BooksPagesBucketData) {
          throw new Error('Failed to upload file')
        }

        const book_page_path = {
          // book_id: book_id,
          filePath: BooksPagesBucketData.path,
        }

        console.log("Path before convertToBase64:", BooksPagesBucketData.path);

        const image_base64 = await convertToBase64(book_page_path);

        const page: PageDetails = {
          user_id: user_id,
          book_id: book_id,
          image_base64: image_base64,
        };
        const pageData = await createPage(page);

      } catch (error) {
        console.error('Upload image page failed:', error)
      }
    })
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" />
        <CustomSubmitButton
          label={isPending ? 'Uploading...' : 'Upload Page'}
          onClick={() => startTransition(() => { })}
          isLoading={isPending}
          disabled={isPending}
        />
      </form>
    </main>
  )
}

export default PageUploadForm
