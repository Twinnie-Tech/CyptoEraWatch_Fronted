'use client'
import React, { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from "./columns";
import { useSession } from 'next-auth/react';
import {Session} from "next-auth";
import { ColumnDef } from '@tanstack/react-table';
import { useUser } from '@app/context/UserContext';
import { fetchPosts } from './fetchPosts';


interface BlogType{
    id: number
    content: string
    status: string
    title: string
    tag:string
    createdAt: string
}
interface UserType{
    email:string
    id:string
    image:string
    name:string
}
export interface CustomSession extends Session {
    user:UserType
}



const Articles = () => {
    const { data: session } = useSession() as {data:CustomSession | null};
    const [articles, setArticles] = useState<BlogType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useUser();


    useEffect(() => {
        fetchPosts(user, session, setIsLoading, setArticles);
    }, [session]);
    return (
        <div className='mx-10 pt-5'>
        {isLoading ? 
        (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        ) : (
            <DataTable columns={columns as ColumnDef<BlogType, unknown>[]} data={articles} />
        )}
        </div>
    )
}
export default Articles
