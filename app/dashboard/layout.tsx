"use client"
import React from 'react'
import SideMenu from '../../components/SideMenu';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
const DashboardLayout = ({ children }: {
    children: React.ReactNode
}) => {
    const { data: session } = useSession();
if(session == null){
    redirect("/");
}
    return (
        <div className='flex w-full'>
            <aside className='flex-[1]'>
                <SideMenu />
            </aside>
            <div className="bg-gray-100 flex-[10] p-4 rounded min-h-[300px]">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
