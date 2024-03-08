import React from 'react';
import Link from 'next/link';
interface formInputs {
    type: string,
    post: any,
    setPost: any,
    submitting: boolean,
    handleSubmit: any,
}

const Form: React.FC<formInputs> = ({ type, post, setPost, submitting, handleSubmit }) => {
    // console.log(type, post, setPost, submitting, handleSubmit)
    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>
                    {type}
                </span>
                Blog
            </h1>
            <p className='desc text-left max-w-md'>
                {type} amazing posts that helps Crypto audience get the latest insights of cryptocurrency
            </p>
            <form
                onSubmit={handleSubmit}
                className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
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
                        placeholder='Topic you are talking about'
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
                        placeholder='Enter content here ...'
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
                        placeholder='#tag'
                        required
                        className="form_input"
                    />
                </label>
                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link href='/' className='text-gray-500 text-sm'>
                        Cancel
                    </Link>
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

export default Form
