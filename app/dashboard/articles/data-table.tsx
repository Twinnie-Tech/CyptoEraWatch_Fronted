"use client"

import {
    ColumnDef,
    flexRender,
    ColumnFiltersState,
    SortingState,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    useReactTable,

} from "@tanstack/react-table"

import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@components/ui/button"

import { useState } from "react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        },
    })

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table?.getHeaderGroups()?.map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup?.headers?.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="bg-blue-300 text-white py-2">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table?.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="w-[100%] border-2"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-3 border-3 text-center">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* pagination */}
            <div className="flex item-center justify-around  space-x-2 py-4">
                <Button variant="outline" className="flex justify-around align-center p-3" size="sm" onClick={() => { table.previousPage() }} disabled={!table.getCanPreviousPage()}>
                    <span className="">Previous page</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex justify-around algin-center p-3" onClick={() => { table.nextPage() }} disabled={!table.getCanNextPage()}>
                    <span className="text-black">Next page</span>
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
