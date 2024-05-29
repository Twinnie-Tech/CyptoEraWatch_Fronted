'use client'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
import { data } from '@app/Dummy/MOCK_DATA'
import { columns } from "./columns"
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
const Articles = () => {
    const { data: session } = useSession();
    console.log(session?.user);
    const [article, setArticles] = useState();

    const fetchPosts = async () => {
        const resp = await fetch("/api/blog");
        const data = await resp.json();
        const blog = data.filter((article: any) => article.author?._id !== session?.user?.id);
        setArticles(blog);
        //Check if the author id matches the logged in user returns only those data
    };
    //const info = useQuery({ queryKey: ["blogs"], queryFn: fetchPosts });
    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <div className='mx-10 pt-5'>
            <DataTable columns={columns} data={article} />
        </div>
    )
}

export default Articles
