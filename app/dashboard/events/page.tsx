'use client'
import React, { useEffect,useState } from 'react'

const Events = () => {
    const [isLoading, setIsLoading] = useState(true);
    const fetchEvents = async () => {
        const resp = await fetch("/api/event")
        const data = await resp.json()
    };
    useEffect(() => {
        fetchEvents();
        setTimeout(()=>{
            setIsLoading(false);
            },1000);
    }, []);
    return (
        <>
        {isLoading ? (
        <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div> 
        ):(
            <div>
            <p>Upcoming Events</p>
        </div>
        )}
        </>
    )
}

export default Events
