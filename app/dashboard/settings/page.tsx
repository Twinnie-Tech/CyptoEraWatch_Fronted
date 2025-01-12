"use client"
import { useEffect,useState } from 'react'
const Settings = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(()=>{
setIsLoading(false);
        },1000);
    }, []);
    return (
        <>
      {isLoading ? 
      (
        <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div> 
      ):(
        <p>Settings page</p>
      )}
        </>

   
    )
}

export default Settings
