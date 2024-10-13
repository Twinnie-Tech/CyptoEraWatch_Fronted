'use client'
import React, { useEffect } from 'react'

const Events = () => {
    const fetchEvents = async () => {
        const resp = await fetch("/api/event")
        const data = await resp.json()
    };
    useEffect(() => {
        fetchEvents();
    }, []);
    return (
        <div>
            <p>Upcoming Events</p>
        </div>
    )
}

export default Events
