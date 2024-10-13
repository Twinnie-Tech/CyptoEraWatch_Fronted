'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import logoImage from "../public/assets/images/logo.svg";
const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropDown] = useState(false);

    useEffect(() => {
        const declareProviders = async () => {
            const resp: any = await getProviders();
            setProviders(resp);
        }
        declareProviders();
    }, []);
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image src={logoImage} alt='Logo image' width="50" height="50" className='object-contain' />
                <p className='logo_text'>CryptoEraWatch</p>
            </Link>
            <Link href="/articles">
                <p className='text-xl font-bold'>Articles</p>
            </Link>
            <Link href="/market">
                <p className='text-xl font-bold'>Market</p>
            </Link>

            {/* Desktop device */}
            <div className='sm:flex hidden'>
                {
                    session?.user ? (
                        <div className='flex gap-3 md:gap-5'>
                            <Link href="/dashboard/createblog"
                                className='black_btn'
                            >
                                Create Blog
                            </Link>
                            <button
                                type='button'
                                onClick={signOut}
                                className='outline_btn'>
                                Sign Out
                            </button>
                            <Link href="/dashboard">
                                <Image src={session?.user.image} alt='userProfile' width={30} height={30} className='rounded-full' />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider: any) => (
                                    <button type='button'
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className='black_btn'
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                    )
                }
            </div>
            <div className='sm:hidden flex relative'>
                {
                    session?.user ? (
                        <div className='flex'>
                            <Image
                                src={session?.user.image} alt='userProfile' width={30} height={30}
                                className='rounded-full'
                                onClick={() => setToggleDropDown((prev) => !prev)}
                            />
                            {toggleDropdown && (
                                <div className='dropdown flex flex-col justify-between items-between'>
                                    <Link href="/profile"
                                        className='dropdown_link'
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link href="/profile"
                                        className='dropdown_link mt-3'
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        Create Post
                                    </Link>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            setToggleDropDown(false)
                                            signOut();
                                        }
                                        }
                                        className='black_btn'
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider: any) => (
                                    <button type='button'
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className='black_btn'
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>

                    )
                }
            </div>
        </nav>
    )
}

export default Nav
