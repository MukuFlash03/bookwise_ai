import { SelectedBooksResponse } from "@/lib/types/books";
import { TableCell } from "@/components/ui/table"

export const BookDataCell = ({ data, field }: { data: SelectedBooksResponse; field: keyof SelectedBooksResponse }) => {
  const value = data[field];

  return (
    <TableCell>
      {value ? String(value) : "No data available"}
    </TableCell>
  );
};
