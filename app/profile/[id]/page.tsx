'use client'
import {useEffect,useState} from 'react';
import Image from 'next/image';

interface UserType {
    userName: string
    email: string
    image: string
    role: string
    __v: number
    _id: string
}

interface BlogType{
    id: string
    title: string
    author: {
        _id: string
    }
}
const Profile = ({params}:{params:{id:string}}) => {
    const [user, setUser] = useState<UserType | null>(null);
    const  [blogs, setBlogs] = useState<BlogType[]>([]);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(`/api/user/${params?.id}`);
            const data = await res.json();
            setUser(data);
        };

        const getBlogs = async ()=>{
            const res = await fetch(`/api/blog?author=${params?.id}`);
            const data = await res.json();
            const userBlogs = data.filter((blog: BlogType) => blog.author._id === params.id);
            setBlogs(userBlogs);
        }
        getUser();
        getBlogs();
    }, [params.id]);

    const handleSubscribe = () => {
        // Implement subscription logic here
        setIsSubscribed(!isSubscribed);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        {user && (
            <>
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <Image 
                        src={user?.image || 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'} 
                        alt={user?.userName} 
                        width={128} 
                        height={128}
                        className="object-cover"
                    />
                </div>
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-2">{user?.userName}</h1>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-gray-500 capitalize font-semibold">{user?.role}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Blogs</h2>
                    <p className="text-gray-700">Total blogs: {blogs?.length}</p>
                    <ul className="mt-4 space-y-2">
                        {blogs?.slice(0, 5).map((blog) => (
                            <li key={blog?._id} className="text-blue-600 hover:underline">
                                {blog?.title}
                            </li>
                        ))}
                    </ul>
                    {blogs?.length > 5 && (
                        <p className="mt-4 text-gray-500">And {blogs?.length - 5} more...</p>
                    )}
                </div>
                <button
                        onClick={handleSubscribe}
                        className={`mt-6 px-6 py-2 rounded-full font-semibold text-white ${
                            isSubscribed ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                        } transition duration-300`}
                    >
                        {isSubscribed ? 'Subscribed' : 'Subscribe'}
                    </button>
            </>
        )}
    </div>
    )
}
export default Profile
