'use client'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
import { columns } from "./columns"
import { useSession } from 'next-auth/react'
import {Session} from "next-auth";
import { ColumnDef } from '@tanstack/react-table'
import { useUser } from '@app/context/UserContext'

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

    const formattedDate = (date: Date) => date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

    const fetchPosts = async () => {
        setIsLoading(true);
        const resp = await fetch("/api/blog");
        const data = await resp.json();
        //Get all the blogs if you have logged in as Admin from the user?.role
        const blog = user?.role == "admin" ? data : data.filter((article: any) => article.author?._id === session?.user?.id);
        localStorage.setItem("totalBlogs", JSON.stringify(blog.length));
        const blogStructure = blog.map((article: any) => ({
            id: article._id,
            content: article.content,
            status: article.status,
            title: article.title,
            tag: article.tag,
            createdAt: formattedDate(new Date(article.date)),
        }));
        setArticles(blogStructure);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPosts();
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
