'use client'
import logoDarkMode from '@/assets/images/logo-dark-mode.png'
import logoLightMode from '@/assets/images/logo-light-mode.png'
import Image from 'next/image';
import { MdLightMode, MdDarkMode  } from "react-icons/md";
import {changeMode} from '@/features/mode/mode-slice'
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
    const mode = useSelector((state) => state.mode.value)
    const dispatch = useDispatch()

    function handleChengeMode(){
        !mode ? dispatch(changeMode(true)) : dispatch(changeMode(false))
    }
    return(
        <div className={`container-fluid ${mode ? 'dark-mode' : 'light-mode'}`}>
            <div className="container">
                <div className="row">
                    <div className='col-2'>
                        <div style={{width:'200px', height:'150px'}}>
                            <Image src={!mode ? logoLightMode : logoDarkMode} width={500} height={500} alt='logo' style={{width:'100%', height:'100%', objectFit:'contain'}} />
                        </div>
                    </div>
                    <div className='col'></div>
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