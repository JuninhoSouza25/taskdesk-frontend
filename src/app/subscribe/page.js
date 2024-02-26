'use client'
import logo from '@/assets/images/logo-light-mode.png'
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import Loading from '../components/Loading';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Subscribe = () => {

    const [ name, setName ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmpassword, setConfirmPassword] = useState('')
    const [ message, setMessage ] = useState(null)
    const [ resStatus, setResStatus ] = useState()
    const [ loading, setLoading ] = useState(false)
    const { push } = useRouter();


    const url = process.env.URL_API


    const hanbleSubscribe = (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append('name', name.trim())
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirmpassword', confirmpassword)

        axios.post(`${url}/users`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            setMessage(response.data.msg)
            setResStatus(response.status)
            setLoading(false)
            setTimeout(() => {
                push('/login')
              }, 300);
        })
        .catch((error) => {
            setMessage(error.response.data.msg)
            setResStatus(error.response.status)
            setLoading(false)
        })

    }

    return(
        <div className="subscribe container-fluid bg-light">
            <div className="container">
                <div className="row">
                    <div className="inner col-12 d-flex justify-content-center align-items-center">
                        <div className='box-image'>
                            <Image src={logo} width={500} height={500} alt='logotipo task-desk'/>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='d-flex justify-content-center'>
                        <div className='col-12 col-md-6 col-lg-5'>
                            <h2 className='fw-bold text-center mb-5'>Efetuar cadastro</h2>
                            <form onSubmit={hanbleSubscribe}>
                                <div>
                                    <label>Nome</label>
                                    <input 
                                    type='text' 
                                    name='nome' 
                                    id='nome' 
                                    placeholder='Digite seu nome'
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label>Username</label>
                                    <input 
                                    type='text' 
                                    name='username' 
                                    id='username' 
                                    placeholder='Digite seu username'
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input 
                                    type='text' 
                                    name='email' 
                                    id='email' 
                                    placeholder='Digite seu email'
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label>Senha</label>
                                    <input 
                                    type='password' 
                                    name='password' 
                                    id='password' 
                                    placeholder='Digite senha senha'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label>Confirme sua senha</label>
                                    <input 
                                    type='password' 
                                    name='confirmpassword' 
                                    id='confirmpassword' 
                                    placeholder='Confirme senha senha'
                                    required
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    ></input>
                                </div>
                                <input className='mt-3' type='submit' id='submit' value={"Criar usuário"}/>

                                { loading && <Loading />}

                                {!message ? null : (resStatus === 201 ? 
                                (
                                    <div className="col-12 text-center">
                                        <p className="fs-4 fw-bold text-success">{message}</p>
                                    </div>
                                ) : (
                                    (
                                    <div className="col-12 text-center">
                                        <p className="fs-4 fw-bold text-danger">{message}</p>
                                    </div>
                                )
                                )
                                )}
                            </form>
                            
                            <span className='text-body fs-4'>Ja é um membro? <Link className="fw-bold" style={{textDecoration:'none'}} href={'/login'}>Faça o login!</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe;