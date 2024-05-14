"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArticleDetails } from "@app/Dummy/MOCK_DATA"
import { ArrowUpDown } from "lucide-react"
import { MdDelete } from "react-icons/md";
import { Button } from "@components/ui/button";
import AlertDialogDemo from "@components/AlertDialogDemo";

// export type Article = {
//     id: string
//     title: string
//     shortDescription: string
//     status: "pending" | "processing" | "accepted" | "rejected"
//     createdAt: string
// }
export const columns: ColumnDef<ArticleDetails>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className=""
                >
                    <span>Title</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "tag",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className=""
                >
                    <span>Tag</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    // {
    //     accessorKey: "status",
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //                 className=""
    //             >
    //                 <span>Status</span>
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         )
    //     },
    // },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className=""
                >
                    <span>Created At</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    // {
    //     id: "actions",
    //     header: ({ column }) => {
    //         return (
    //             <AlertDialogDemo typeButton="AddAction" name="Add Role" />
    //         )
    //     },
    //     cell: () => {
    //         return (
    //             <div>
    //                 <Button className="">
    //                     <AlertDialogDemo typeButton="EditAction" name="Edit Role" />
    //                 </Button>
    //                 <Button>
    //                     <MdDelete className="text-red-600 text-2xl" />
    //                 </Button>
    //             </div>
    //         )

    //     },

    // }
]