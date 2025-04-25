import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

export interface Column<T> {
  key: keyof T;
  label: string;
}

interface DataTableProps<T extends { key: React.Key }> {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
}

export default function DataTable<T extends { key: React.Key }>({ columns, rows, loading = false }: DataTableProps<T>) {
  return (
    <Table aria-label="Data table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn className="text-center text-[15px] text-black font-semibold bg-[#1d4ed8]/20" key={String(column.key)}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={!loading && <span className="text-[15px] text-red-500 font-medium">No data</span>} items={rows}>
        {(item) => <TableRow className="hover:bg-[#1d4ed8]/5" key={item.key}>{(columnKey) => <TableCell className="text-center">{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}
      </TableBody>
    </Table>
  );
}
