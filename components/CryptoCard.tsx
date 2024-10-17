'use client';
import React from 'react'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CustomSession } from '@app/dashboard/articles/page';


const CryptoCard = ({ blog, handleTagClick }: any) => {
    const { data: session } = useSession() as { data: CustomSession | null };
    const router = useRouter();
    const handleProfileClick = () => {
        if (blog.author?._id === session?.user?.id) return router.push("/dashboard");

        router.push(`/profile/${blog.author?._id}?name=${blog.author?.userName}`);
    };
    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>
                <button
                    className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                    onClick={handleProfileClick}
                    onKeyDown={(e) => e.key === 'Enter' && handleProfileClick()}
                >
                    <Image
                        src={blog.author?.image}
                        alt='user_image'
                        width={40}
                        height={40}
                        className='rounded-full object-contain'
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>
                            {blog.author?.username}
                        </h3>
                        <p className='font-inter text-sm text-gray-500'>
                            {blog.author?.email}
                        </p>
                    </div>
                </button>
            </div>

            <p className='my-4 font-satoshi text-sm text-gray-700'>{blog.title}</p>
            <div className='flex justify-between items-center gap-2'>
            <button
                className='font-inter text-sm blue_gradient cursor-pointer'
                onClick={() => handleTagClick && handleTagClick(blog.tag)}
                onKeyDown={(e) => e.key === 'Enter' && handleTagClick && handleTagClick(blog.tag)}
            >
                #{blog.tag}
            </button>
            {session?.user?.id === blog.author?._id  && (
                <div className='flex justify-center items-center gap-2'>
                    <button className='font-inter text-sm green_gradient cursor-pointer'
                    onClick={() => router.push(`/dashboard/articles`)}
                    onKeyDown={(e) => e.key === 'Enter' && router.push(`/dashboard/articles`)}
                    >
                        Edit
                    </button>
                </div>
            )}
            </div>

        </div>
    )
}

export default CryptoCard
