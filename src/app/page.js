'use client'
import { useEffect, useState } from "react"
import Loading from "./components/Loading"
import logo from '@/assets/images/logo-dark-mode.png'
import Image from "next/image"
import { useRouter } from "next/navigation"

const Login = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ erro, setErro ] = useState('')
    const [ msg, setMsg ] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        router.replace('/login')

    },[])

 

    return(
        <div className="login container-fluid">
            <div className="row h-100">
                <div className="col-12 col-md-6" style={{backgroundColor:'var(--color-dark)'}}>
                    <div className="h-100 d-flex align-items-center justify-content-center">
                        <div className="box-image">
                            <Image src={logo} width={500} height={500} alt="logotipo taskdesk" />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center h-100" style={{backgroundColor:'var(--color-shade)'}}>

                    <div className="mb-5">
                        <h1 className="h1 fw-bold mb-5">Login</h1>
                    </div>

                    <form>
                        <div>
                            <label>Email</label>
                            <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Senha</label>
                            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <input type="submit" id="submit" value={"Entrar"}/>
                    </form>

                    {loading && <Loading />}
                    {msg && (
                    <>
                        <p>{msg}</p>
                        <p>Aguarde um momento, estamos te direcionando...</p>
                        <Loading />
                    </>
                    )}
                    {erro && (
                    <span className='text-danger'>Usuário ou senha inesistente</span>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Login;