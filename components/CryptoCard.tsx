'use client';
import React,{useState,useEffect,useRef} from 'react'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CustomSession } from '@app/dashboard/articles/page';
import { PostModal } from './Feed';
import {toast} from "react-toastify";

let hasNotifiedLogout = false;
const CryptoCard = ({ blog, handleTagClick }: any) => {
    const [showModal,setShowModal] = useState(false);
    const { data: session } = useSession() as { data: CustomSession | null };
    const router = useRouter();

    useEffect(()=> {
        if(session?.user?.id == undefined && !hasNotifiedLogout) {

        setTimeout(()=> {
            toast.error("You must be logged in to comment.");
        },0);
       hasNotifiedLogout = true;
      }

      if(session?.user?.id) {
        hasNotifiedLogout = false;
      }
    },[session]);
    
    const handleProfileClick = () => {
        if (blog.author?._id === session?.user?.id) return router.push("/dashboard");

        router.push(`/profile/${blog.author?._id}?name=${blog.author?.userName}`);
    };

    return (
        <>
        
        <div className='prompt_card bg-blue-300'>
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
            <button
            className='font-inter text-sm orange_gradient cursor-pointer'  
            onClick={() => {
                if (!session?.user?.id) {
                    toast.error('Please login to read full article');
                    return;
                }
                setShowModal(true);
            }}>
                Read More
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
        {
    showModal && (
        <div className='z-50'>
            <PostModal post={blog} onClose={() => setShowModal(false)} />
        </div>
    )
}
        </>
    )
}

export default CryptoCard
