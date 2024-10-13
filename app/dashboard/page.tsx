'use client'
import { useEffect,useState } from 'react';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
    const {data:session} = useSession();
    const  [totalArticles, setTotalArticles] = useState<number>(0);
    const [userName, setUserName] = useState<string>('');
    useEffect(() => {
        const getAllArticles = async()=>{
            const resp = await fetch("/api/blog");
            const data = await resp.json();
            
        const blog = data.filter((article: any) => article.author?._id == session?.user?.id);
        setTotalArticles(blog?.length);
        };
        getAllArticles();
        setUserName(session?.user?.name || '');
    }, []);

 
    return (
        <div>
            <p>Welcome back <span className='font-bold'>{userName}</span></p>
            <div className='rounded-md p-4 flex-col justify-between  align-start bg-blue-300 w-[400px]'>
                <p>My Articles</p>
                <p className='font-bold text-xl'>{totalArticles}</p>
            </div>
        </div>
    )
}

export default Dashboard
