import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { MdOutlineEdit } from 'react-icons/md';
import { ArticleDetails } from '@app/Dummy/MOCK_DATA';
import UpdateForm from './UpdateForm';
import { useUser } from '@app/context/UserContext';
import { fetchPosts } from '@app/dashboard/articles/page';

interface AlertDialogDemoProps {
    typeButton: string;
    name: string;
    blog:ArticleDetails
}



const AlertDialogDemo = ({ typeButton, name, blog }: AlertDialogDemoProps) => {
    const { user } = useUser(); 
    const buttonContent = () => {
        if (typeButton === "AddAction") {
            return "Add Article";
        } else if (typeButton === "EditAction") {
            return <MdOutlineEdit className="text-white text-2xl" />;
        } else {
            return " ";
        }
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button className="text-violet11 hover:bg-mauve3  inline-flex h-[35px] items-center justify-center rounded-[4px] bg-primary-orange px-[15px] font-medium leading-none outline-none">
                    {buttonContent()}
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[auto] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none ">
                    <AlertDialog.Title className="text-mauve12 m-0 text-[17px]  text-center w-[100%]  font-bold">
                        {name}
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                        <div className="grid w-full mb-4  items-center gap-1.5">
                            <UpdateForm type='Update' blog={blog} fetchPosts={() => fetchPosts(user, null, () => {}, () => {})} />
                        </div>
                    </AlertDialog.Description>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};export default AlertDialogDemo;