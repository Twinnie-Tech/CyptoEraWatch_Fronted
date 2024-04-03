'use client';
import React from 'react'
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


const CryptoCard = ({ blog, handleTagClick }) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const handleProfileClick = () => {
        if (blog.author._id === session?.user?.id) return router.push("/profile");

        router.push(`/profile/${blog.author._id}?name=${blog.author.userName}`);
    };
    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>
                <div
                    className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                    onClick={handleProfileClick}
                >
                    <Image
                        src={blog?.author?.image}
                        alt='user_image'
                        width={40}
                        height={40}
                        className='rounded-full object-contain'
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>
                            {blog?.author?.username}
                        </h3>
                        <p className='font-inter text-sm text-gray-500'>
                            {blog?.author?.email}
                        </p>
                    </div>
                </div>

                {/* <div className='copy_btn' onClick={handleCopy}>
                    <Image
                        src={
                            copied === post.prompt
                                ? "/assets/icons/tick.svg"
                                : "/assets/icons/copy.svg"
                        }
                        alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
                        width={12}
                        height={12}
                    />
                </div> */}
            </div>

            <p className='my-4 font-satoshi text-sm text-gray-700'>{blog.content}</p>
            <p
                className='font-inter text-sm blue_gradient cursor-pointer'
                onClick={() => handleTagClick && handleTagClick(blog.tag)}
            >
                #{blog.tag}
            </p>

            {session?.user?.id === blog?.author?._id && pathName === "/profile" && (
                <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                    <p
                        className='font-inter text-sm green_gradient cursor-pointer'
                    // onClick={handleEdit}
                    >
                        Edit
                    </p>
                    <p
                        className='font-inter text-sm orange_gradient cursor-pointer'
                    // onClick={handleDelete}
                    >
                        Delete
                    </p>
                </div>
            )}
        </div>
    )
}

export default CryptoCard
