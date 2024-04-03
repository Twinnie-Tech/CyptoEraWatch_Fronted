"use client"
import React, { ChangeEvent } from 'react'
import { useState, useEffect } from "react";
import CryptoCard from './CryptoCard';

interface CryptoCardValues {
    data: any,
    handleTagClick: any
}

const CryptoCardList: React.FC<CryptoCardValues> = ({ data, handleTagClick }) => {
    console.log(data);
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((item: any, i: any) => {
                return (
                    <CryptoCard key={i} blog={item} handleTagClick={handleTagClick} />
                )
            })}
        </div>
    )
}
const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const handleSearchChange = (e: any) => {
        setSearchText(e.target.value);
    }
    const fetchPosts = async () => {
        const resp = await fetch("/api/blog");
        const data = await resp.json();
        console.log(data);
        setAllPosts(data);
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
                data={allPosts}
                handleTagClick={() => { }}
            />
        </section>
    )
}

export default Feed
