import { NotesResponse } from "@/lib/types/notes";
import { TableCell } from "@/components/ui/table"

export const NoteDataCell = ({ data, field }: { data: NotesResponse; field: keyof NotesResponse }) => {
  const value = data[field];

  const renderValue = () => {
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc pl-4">
          {value.map((item, index) => (
            <li key={index}>{String(item)}</li>
          ))}
        </ul>
      );
    }
    return value ? String(value) : "No data available";
  };

  return (
    <TableCell>
      {/* {value ? String(value) : "No data available"} */}
      {renderValue()}
    </TableCell>
  );
};
