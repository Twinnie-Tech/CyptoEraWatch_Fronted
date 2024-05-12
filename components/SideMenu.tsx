'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { GrDashboard } from 'react-icons/gr';
import { GrArticle } from 'react-icons/gr';
import { MdCreateNewFolder } from "react-icons/md";

const ActiveMenuLink = ({ children, href }: any) => {
    const pathName = usePathname();
    const active = href === pathName;

    return (
        <Link
            href={href}
            className={`hover:bg-gray-100 p-2 rounded block text-sm ${active ? 'text-purple-400 font-semibold' : "text-gray-500"} `}
        >
            {children}
        </Link>
    )
}

const SideMenu = () => {
    return (
        <nav className='h-[100vh] w-[100%]'>
            <ul className='flex flex-col justify-between h-[100%]'>
                <div className='h-[25%] justify-center m-auto'>
                    <li className='w-full'>
                        <ActiveMenuLink href="/dashboard">
                            <GrDashboard className='text-2xl' />
                        </ActiveMenuLink>
                    </li>
                </div>
                <div className="grid grid-cols-1 justify-items-center m-auto h-[50%]">
                    <li className="w-full">
                        <ActiveMenuLink href='/dashboard/articles' >
                            <GrArticle className='text-2xl' /> <span>Articles</span>
                        </ActiveMenuLink>
                    </li>
                    <li className="w-full">
                        <ActiveMenuLink href='/dashboard/createBlog'>
                            <MdCreateNewFolder className='text-2xl' /> <span>Create Articles</span>
                        </ActiveMenuLink>
                    </li>
                </div>
            </ul>
        </nav>
    )
}

export default SideMenu
