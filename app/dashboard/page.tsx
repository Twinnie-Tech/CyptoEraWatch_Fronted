'use client'
import { useEffect,useState } from 'react';
import { useSession } from 'next-auth/react';
import { CustomSession } from './articles/page';
import { UserType } from '@app/profile/[id]/page';

const Dashboard = () => {
    const { data: session } = useSession() as { data: CustomSession | null };
    const  [totalArticles, setTotalArticles] = useState<number>(0);
    const [userName, setUserName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserType | null>(null);
    const getUser = async () => {
        const res = await fetch(`/api/userbyemail`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:session?.user.email})
        });
        const data = await res.json();
        setUser(data);
    };
    

    const getAllArticles = async()=>{
        setIsLoading(true);
        const resp = await fetch("/api/blog");
        const data = await resp.json();
        console.log(data,"all data");
        
    const blog = user?.role == "admin" ? data : data.filter((article: any) => article.author?._id == session?.user?.id);
    setTotalArticles(blog?.length);
    setIsLoading(false);
    };

    useEffect(() => {
        getUser();
        getAllArticles();
        setUserName(session?.user?.name || '');
    }, [session]);

 
    return (
        <div>
            {
                isLoading ? (
                    <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                ): (
                    <>
                    <p>Welcome back <span className='font-bold'>{userName}</span></p>
                    <div className='rounded-md p-4 flex-col justify-between  align-start bg-blue-300 w-[400px]'>
                        <p>My Articles</p>
                        <p className='font-bold text-xl'>{totalArticles}</p>
                    </div>      
                    </>
                )
            }
        </div>
    )
}

export default Dashboard
