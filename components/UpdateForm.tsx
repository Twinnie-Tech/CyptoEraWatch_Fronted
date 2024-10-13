import { ArticleDetails } from '@app/Dummy/MOCK_DATA';
import {useState} from 'react';
import {toast} from "react-toastify";
import Link from 'next/link';
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useRouter } from 'next/navigation';

interface UpdateFormProps{
    blog: ArticleDetails;
    type:string
}

const UpdateForm = ({blog,type}:UpdateFormProps) => {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter(); 

    const [post, setPost] = useState({
        title: blog.title,
        content: blog.content,
        tag: blog.tag,
        image: blog.image,
    });

    const updatePost = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const resp = await fetch(`/api/blog/update/`, {
                method: "PATCH",
                body: JSON.stringify({
                    id: blog.id,
                    title: post.title,
                    content: post.content,
                    tag: post.tag,
                    image: post.image,
                })
            });

            if (resp.ok) {
                toast.success("Blog updated successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                router.push("/dashboard/");
            } else {
                throw new Error("Failed to update blog");
            }
        } catch (error) {
            toast.error("Something went wrong!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setSubmitting(false);
        } 
    };
  return (
    <section>
          <form
            onSubmit={updatePost}
            className='w-full'
            >
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700 '>
                        Blog  Title {` `}
                    </span>
                    <span className='font-normal'></span>
                    <input
                        value={post.title}
                        onChange={(e) => setPost({
                            ...post,
                            title: e.target.value
                        })}
                        placeholder={blog?.title}
                        required
                        className="form_input"
                    />
                </label>
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700 '>
                        Content
                    </span>
                    <textarea
                        value={post.content}
                        onChange={(e) => setPost({
                            ...post,
                            content: e.target.value
                        })}
                        placeholder={blog.content}
                        className="form_textarea"
                        required
                    />
                </label>

                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700 '>
                        Tags {` `}
                    </span>
                    <span className='font-normal'>(#Bitcoin,#Ethereum)</span>
                    <input
                        value={post.tag}
                        onChange={(e) => setPost({
                            ...post,
                            tag: e.target.value
                        })}
                        placeholder={blog?.tag}
                        required
                        className="form_input"
                    />
                </label>
                <div className='flex-end mx-3 gap-4'>
                <AlertDialog.Action asChild>
                        <button className="px-5 py-1.5  bg-red-600 hover:bg-red-400  rounded-full text-white">
                            Cancel
                        </button>
                    </AlertDialog.Action>
                    <button
                        type='submit'
                        disabled={submitting}
                        className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                    >
                        {submitting ? `${type}ing...` : type}
                    </button>
                </div>
            </form>
    </section>
  )
}

export default UpdateForm
