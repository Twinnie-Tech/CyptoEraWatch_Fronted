import React from 'react'
import Feed from '@components/Feed';
import '../css/output.css';
const Home = () => {
    return (
        <section className='w-full flex-center flex-col'>
            <h1 className='head_text text-center'>Get the latest Cryptocurrency news
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center mt-5'>Which is the best coins to start investing on ?</span>
            </h1>
            <p className='desc text-center'>
                Welcome to  <span className='orange_gradient font-bold'>CryptoEraWatch</span>  news, where you shall discover what is trending in the world of Cryptocurrency and never miss any information
            </p>
            <Feed />
        </section>
    )
}

export default Home
