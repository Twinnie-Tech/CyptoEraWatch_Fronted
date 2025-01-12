"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { toast } from "react-toastify";
import { CustomSession } from "../articles/page";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Session } from "next-auth";
const CreateBlog = () => {
  const [file, setFile] = useState<File | null | any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession() as { data: CustomSession | null };
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    content: "",
    tag: "",
    image: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const createPost = async (e: React.FormEvent<HTMLInputElement>) => {
    setLoading(true);
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
          userId: session?.user?.id,
        }),
      });
      if (resp.ok) {
        toast.success("Blog created successfully!", {
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
      } else {
        toast.error("Something went wrong!", {
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
  };


  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <Form
          type="Create"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={createPost}
        />
      )}
    </>
  );
};

export default CreateBlog;
