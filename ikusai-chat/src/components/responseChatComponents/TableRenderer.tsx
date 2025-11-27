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
<div className="w-full max-w-3xl max-h-80  overflow-auto rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
  <table className="w-full text-xs text-left border-collapse">
    <thead className="bg-[#2674C7] text-white">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="px-2 py-1 font-medium text-left tracking-wide"
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody className="bg-white dark:bg-zinc-800">
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className="border-b border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
        >
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="px-2 py-1 text-gray-800 dark:text-gray-200 whitespace-nowrap"
            >
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
