// src/components/TableRenderer.tsx
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from '@tanstack/react-table';

interface Props {
  data: {
    columns: string[];
    rows: any[][];
  };
}

export default function TableRenderer({ data }: Props) {
  // Generamos columnas dinámicamente
  const columns = React.useMemo<ColumnDef<any>[]>(
    () =>
      data.columns.map((col, index) => ({
        header: col,
        accessorFn: (row) => row[index],
      })),
    [data.columns]
  );

  const table = useReactTable({
    data: data.rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-zinc-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t dark:border-zinc-700">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
