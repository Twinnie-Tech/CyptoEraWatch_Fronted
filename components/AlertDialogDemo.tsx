import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { MdOutlineEdit } from 'react-icons/md';

const AlertDialogDemo = ({ typeButton, name }: any) => (
    <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
            <button className="text-violet11 hover:bg-mauve3 shadow-blackA4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-lime-400 px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                {typeButton == "AddAction" ? "Add Role" : typeButton == "EditAction" ? <MdOutlineEdit className="text-green-600 text-2xl" /> : " "}
            </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[35vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <AlertDialog.Title className="text-mauve12 m-0 text-[17px]  text-center w-[100%]  font-bold">
                    {name}
                </AlertDialog.Title>
                <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">

                    <div className="grid w-full mb-4  items-center gap-1.5">

                    </div>
                </AlertDialog.Description>
                <div className="absolute bottom-0 right-1 flex justify-end gap-[25px] w-full mt-5">
                    <AlertDialog.Cancel asChild>
                        <button className="text-mauve11 bg-lime-300  focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                            Save
                        </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                            Cancel
                        </button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
);

export default AlertDialogDemo;