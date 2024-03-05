'use client'
import logoDarkMode from '@/assets/images/logo-dark-mode.png'
import logoLightMode from '@/assets/images/logo-light-mode.png'
import Image from 'next/image';
import { MdLightMode, MdDarkMode  } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import {changeMode} from '@/features/mode/mode-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react'
import Link from 'next/link';

const Header = () => {
    const { data: session } = useSession();
    const mode = useSelector((state) => state.mode.value)
    const dispatch = useDispatch()

    function handleChengeMode(){
        !mode ? dispatch(changeMode(true)) : dispatch(changeMode(false))
    }
    
    return(
        <div className={`header container-fluid ${mode ? 'dark-mode' : 'light-mode'}`}>
            <div className="container">
                <div className="row">
                    <div className='col-4 col-md-2'>
                        <div className='img-box'>
                            <Image src={!mode ? logoLightMode : logoDarkMode} 
                            width={500} 
                            height={500} 
                            alt='logo' 
                            priority={true}
                            style={{width:'100%', height:'100%', objectFit:'contain'}} />
                        </div>
                    </div>
                    <div className='col d-flex justify-content-end align-items-center'>
                    </div>
                    <div className='col-6 d-flex flex-column justify-content-center align-items-end'>
                        {session && (
                            <div className='row'>
                                <div className='my-3' style={{width:'55px', height:'55px', overflow:'hidden', borderRadius:'50%'}}>
                                    <Image src={session.user.thumbnail || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs867oiFI9uKZePrJlp5ccrk_PJOu1ABWO8hnIutySxpbwLIHe2VAHDTV6PFb7yua7UbA&usqp=CAU"} 
                                    width={500} 
                                    height={500} 
                                    alt='logo' 
                                    priority={true}
                                    style={{width:'100%', height:'100%', objectFit:'cover'}} />
                                </div>
                            </div>
                        )}
                        {session && <h2 className='fs-4 fs-lg-2'>{`Olá, ${session.user.name}!`}</h2>}
                        <div className='row mt-4'>
                            <div className='col-4'>
                                {session && (
                                    <Link href={`user/${session.user._id}`}>
                                        {mode ? (
                                        <FaUserEdit className='fs-1' style={{cursor:'pointer'}} color='var(--color-white)'/>
                                        ): (
                                        <FaUserEdit className='fs-1' style={{cursor:'pointer'}} color='var(--color-dark)'/>
                                        )}
                                    </Link>
                                )}
                            </div>
                            <div className='col-4'>
                                {mode ? (
                                <MdLightMode className='fs-1' style={{cursor:'pointer'}} color='var(--color-white)' onClick={handleChengeMode}/>
                                ) : (
                                    <MdDarkMode className='fs-1' style={{cursor:'pointer'}} color='var(--color-dark)' onClick={handleChengeMode}/>
                                )}
                            </div>
                            <div className='col-4'>
                                <TbLogout2 className='fs-1 text-danger' style={{cursor:'pointer'}} onClick={signOut} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;