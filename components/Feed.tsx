"use client"
import React, { useState, useEffect } from "react";
import CryptoCard from './CryptoCard';
import Image from 'next/image';
import moment from "moment";
import { useSession } from "next-auth/react";
import { CustomSession } from "@app/dashboard/articles/page";


interface PostalModalProps {
post:any;
onClose : () => void;
}

interface CryptoCardValues {
    data: any,
    handleTagClick: any
}


export const PostModal : React.FC<PostalModalProps> = ({post , onClose}) =>{
  const [commentAuthors,setCommentAuthors] = useState<{[key: string]: any}>({});
  const [newComment,setNewComment] = useState('');
  const { data: session } = useSession() as { data: CustomSession | null };
  
const handleCommentSubmit = async(e: React.FormEvent)=>{
e.preventDefault();
try{
    const response = await fetch(`/api/blog/${post._id}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: newComment,
            authorId: session?.user?.id , // Assuming you have session from next-auth
            createdAt: new Date().toISOString(), 
        })
    });
    if(response.ok){
        const updatedPost = await response.json();
        setNewComment('');
        // Remove the reference to allPosts as it's not defined in the current scope
        // If you need to update the post, you can do it directly
        post.comments = updatedPost.comments;
    }

}catch(error){
    console.error("Error posting comment",error);
}
}

  
  useEffect(()=>{
const fetchCommentAuthors = async ()=>{
    if(post.comments){
        const  authorPromises = post.comments.map(async (comment:any)=>{
            const resp = await fetch(`/api/user/${comment?.author}`);
            const userData = await resp.json();
            return {[comment.author._id]: userData};
        });

        const authors = await Promise.all(authorPromises);
        const authorsMap = authors.reduce((acc,cur)=>({...acc,...cur}),{});
        setCommentAuthors(authorsMap);
    }
};
fetchCommentAuthors();
  },[post.comments]);
    return (
<div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
<div className="bg-white rounded-lg w-[50%] h-[80vh] flex relative p-2">
{/* Left side - Post Content */}
<div className="w-1/2 overflow-y-auto flex flex-col">
    {post.image && (
        <div className="relative h-[50%]">
            <Image 
                src={post.image[0]} 
                alt={post.title} 
                layout="fill" 
                objectFit="cover"
            />
        </div>
    )}
    <div className="p-4">
        <h2 className="text-xl font-bold mb-3">{post.title}</h2>
        <p className="text-gray-700">{post.content}</p>
    </div>
</div>

{/* Right side - Comments and Actions */}
<div className="w-1/2 flex flex-col border-l">
    {/* Comments Section */}
    <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
            {/* Comments mapping here */}
            {post.comments?.map((comment:any, index:number)=>{
                const authorData = commentAuthors[comment.author._id] || comment.author;
                 return(
                    <div key={index} className="flex items-start gap-2">
                        <Image
                            src={authorData?.image}
                            alt={authorData?.userName}
                            width={30}
                            height={30}
                            className="rounded-full"
                        />
                        <div className="flex-1">
                            <p className="font-bold">{authorData?.userName}</p>
                            <div>
                            <p>{comment?.content}</p>
                            <p className="text-gray-500 text-sm">{moment(comment.createdAt).fromNow()}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>

    {/* Actions Bar */}
    <div className="border-t p-4">
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="text-2xl">❤️ {post.likes || 0}</button>
                    <button className="text-2xl">💭 <span className="text-lg">{post.comments?.length || 0}</span> </button>
                    <button className="text-2xl">🔁 {post.reposts || 0}</button>
                </div>
                <button className="text-2xl">📤</button>
            </div>
            
            {/* Comment input */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input 
                type="text" 
                placeholder="Add a comment..." 
                onChange={(e)=>setNewComment(e.target.value)}
                className="w-full p-2 border rounded-lg"
            />
            <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 cursor-pointer"
            >
            Post
            </button>
            </form>

        </div>
    </div>
</div>

{/* Close Button */}
<button 
    onClick={onClose}
    className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800"
>
    ✕
</button>
</div>
</div>
    );
}

const CryptoCardList: React.FC<CryptoCardValues> = ({ data, handleTagClick }) => {
    const [selectedPost, setSelectedPost] = useState<any>(null);
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-16">
                <p className="text-2xl font-bold text-gray-700">No posts found 🔍</p>
                <p className="text-gray-500 mt-2">Try different search terms</p>
            </div>
        )
    }

    return (
        <>
        <div className='mt-16 prompt_layout'>
            {data
            .filter((item:any) => item.status == "approved")
            .map((item: any, i: any) => {
                return (
                    <div key={item._id}>
                        <CryptoCard  blog={item} handleTagClick={handleTagClick} />
                    </div>
                )
            })}
        </div>

        {selectedPost && (
                <PostModal 
                    post={selectedPost} 
                    onClose={() => setSelectedPost(null)}
                />
            )}
        </>
    )
}


const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [allPosts, setAllPosts] = useState([]);
    const [searchResults,setSearchResults] = useState([]);
    const handleSearchChange = (e: any) => {
        const searchValue = e.target.value;
        setSearchText(searchValue);

        const filteredPosts = allPosts.filter((post: any) => 
            post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            post.tag?.toLowerCase().includes(searchValue.toLowerCase()) ||
            post.author?.email?.toLowerCase().includes(searchValue.toLowerCase())
        );

        setSearchResults(filteredPosts);
    }

    const fetchPosts = async () => {
        const resp = await fetch("/api/blog");
        const data = await resp.json();
        setAllPosts(data);
        setSearchResults(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            <CryptoCardList
                data={searchResults}
                handleTagClick={() => { }}
            />
        </section>
    )
}

export default Feed
