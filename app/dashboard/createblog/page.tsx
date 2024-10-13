'use client';
import React from 'react'
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import {toast} from "react-toastify";
const CreateBlog = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        title: "",
        content: "",
        tag: "",
        image: "",
    })
    const createPost = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const resp = await fetch("/api/blog/new", {
                method: "POST",
                body: JSON.stringify({
                    title: post.title,
                    content: post.content,
                    tag: post.tag,
                    image: post.image,
                    userId: session?.user?.id
                })
            })
            if (resp.ok) {
                toast.success("Blog created successfully!",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                router.push("/dashboard");
            }else{
                toast.error("Something went wrong!",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (e) {
            console.log(e);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPost}
        />
    )
}

export default CreateBlog
