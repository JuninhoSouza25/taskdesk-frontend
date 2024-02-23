'use client'
import logoDarkMode from '@/assets/images/logo-dark-mode.png'
import logoLightMode from '@/assets/images/logo-light-mode.png'
import Image from 'next/image';
import { MdLightMode, MdDarkMode  } from "react-icons/md";
import {changeMode} from '@/features/mode/mode-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';

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
                    <div className='col-8 col-md-2'>
                        <div className='img-box'>
                            <Image src={!mode ? logoLightMode : logoDarkMode} 
                            width={500} 
                            height={500} 
                            alt='logo' 
                            priority={true}
                            style={{width:'100%', height:'100%', objectFit:'contain'}} />
                        </div>
                    </div>
                    <div className='col d-flex justify-content-center align-items-center'>{session && <h3>{`Olá, ${session.user.name}!`}</h3>}</div>
                    <div className='col-2 d-flex justify-content-center align-items-center'>
                        {mode ? (
                            <MdLightMode className='fs-1' style={{cursor:'pointer'}} color='var(--color-white)' onClick={handleChengeMode}/>
                        ) : (
                            <MdDarkMode className='fs-1' style={{cursor:'pointer'}} color='var(--color-dark)' onClick={handleChengeMode}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;