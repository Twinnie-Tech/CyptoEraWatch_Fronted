import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from './ui/button';
import { MdDelete } from 'react-icons/md';
import {toast} from "react-toastify";

interface DeleteDialogDemoProps{
    blogId:number
}

const DeleteDialogDemo = ({blogId}:DeleteDialogDemoProps) => {
    const handleDelete = async() => {
        const resp = await fetch("/api/blog/delete",{
            method: "DELETE",
            body: JSON.stringify({
                id: blogId
            })
        });
        if(resp.ok){
            toast.success("Blog deleted successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }else {
            throw new Error("Failed to delete blog!");
        }
    };
  return (
<AlertDialog.Root>
            <AlertDialog.Trigger>
                <MdDelete className="text-red-600 text-2xl" />
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[auto] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-mauve12 m-0 text-[17px]  text-center w-[100%]  font-bold">
                        Delete Blog
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                        <div className="grid w-full mb-4  items-center gap-1.5">
                            Are you sure you want to delete blog ?
                        </div>
                    </AlertDialog.Description>
                    <div className="absolute bottom-0 right-1 flex justify-end gap-[25px] w-full mt-5 p-3">
                        <AlertDialog.Action asChild>
                            <Button className="px-5 py-1.5 bg-red-600 hover:bg-red-400 rounded-full text-white">
                                Cancel
                            </Button>
                        </AlertDialog.Action>
                        <AlertDialog.Action asChild>
                            <Button className="px-5 py-1.5  bg-primary-orange hover:bg-red-100  rounded-full text-white" onClick={handleDelete}>
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
  )
}
export default DeleteDialogDemo
