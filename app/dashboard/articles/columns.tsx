"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArticleDetails } from "@app/Dummy/MOCK_DATA"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@components/ui/button";
import AlertDialogDemo from "@components/AlertDialogDemo";
import ViewBlogContent from "@components/ViewBlogContent";
import DeleteDialogDemo from "@components/DeleteDialogDemo";

 
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
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className=""
                >
                    <span>Status</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: () => {
            return <p>Pending</p>
        }
    },
    {
        accessorKey: "createdAt",
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
    {
        id: "actions",
        header: "Action",
        cell: ({row}) => {
            const blog = row.original;
            return (
                <div>
                    <Button className="">
                        <AlertDialogDemo typeButton="EditAction" name="Edit Blog" blog={blog} />
                    </Button>
                    <Button className="">
                    <DeleteDialogDemo  blogId={blog?.id} />
                    </Button>
                    <Button>
                      <ViewBlogContent content={blog.content} />
                    </Button>
                </div>
            )
        },
    }
]