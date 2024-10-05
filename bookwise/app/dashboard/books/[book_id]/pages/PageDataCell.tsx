import { SelectedPagesResponse } from "@/lib/types/pages";
import { TableCell } from "@/components/ui/table"
import Image from 'next/image';
import { useState } from 'react';

const ImageModal = ({ src, alt, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
    <div className="bg-white p-2 rounded-lg">
      <Image src={src} alt={alt} width={500} height={500} style={{ objectFit: 'contain' }} />
    </div>
  </div>
);

export const PageDataCell = ({ data, field }: { data: SelectedPagesResponse; field: keyof SelectedPagesResponse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const value = data[field];

  if (field === 'image_base64' && typeof value === 'string') {
    const imageSrc = "data:image/png;base64," + value;
    return (
      <TableCell>
        <div onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
          <Image
            src={imageSrc}
            alt="Page thumbnail"
            width={100}
            height={100}
            style={{ objectFit: 'contain' }}
          />
        </div>
        {isModalOpen && (
          <ImageModal
            src={imageSrc}
            alt="Page thumbnail"
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </TableCell >
    );
  }

  return (
    <TableCell>
      {value ? String(value) : "No data available"}
    </TableCell>
  );
};