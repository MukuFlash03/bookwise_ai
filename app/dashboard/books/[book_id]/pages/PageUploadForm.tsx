'use client'

import { useTransition } from 'react'
import { uploadFile, convertToBase64 } from '@/lib/operations/uploadFiles'
import CustomSubmitButton from '@/components/CustomSubmitButton'
import React from 'react'
import { createPage } from '@/lib/operations/apiCalls';
import { PageDetails } from '@/lib/types/pages'

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
        const { filePath } = await uploadFile(formData)
        const image_base64 = await convertToBase64(filePath);
        const page: PageDetails = {
          user_id: user_id,
          book_id: book_id,
          image_base64: image_base64,
        };
        const pageData = await createPage(page);

        // console.log(`${filePath}}`);
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
