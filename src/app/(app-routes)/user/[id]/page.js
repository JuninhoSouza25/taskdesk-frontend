'use client'
import Header from "@/app/components/Header";
import Loading from "@/app/components/Loading";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdNoteAdd, MdOutlineDashboardCustomize } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BiUpload } from 'react-icons/bi'

const User = () => {
    const mode = useSelector((state) => state.mode.value)
    const { id } = useParams()
    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [ message, setMessage ] = useState(null)
    const [ resStatus, setResStatus ] = useState()
    const [ loading, setLoading ] = useState(false)
    const [imageUpload, setImageUpload] = useState()
    const [progress, setProgress] = useState({started: false, pc: 0})
    const [uploadMsg, setUploadMsg] = useState(null)
    const [imgReturn, setImgReturn] = useState()


    const url = process.env.URL_API

    useEffect(() => {
        axios.get(`${url}/user/${id}`)
        .then( response => {
            setName(response.data.user.name)
            setUserName(response.data.user.username)
            setThumbnail(response.data.user.thumbnail)
        })
        .catch(error => console.log(error))
    },[])

    const handleUpdate = (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append('name', name.trim())
        formData.append('username', username)
        formData.append('thumbnail', thumbnail)

        axios.put(`${url}/user/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            setMessage(response.data.msg)
            setResStatus(response.status)
            setLoading(false)
        })
        .catch((error) => {
            setMessage(error.response.data.msg)
            setResStatus(error.response.status)
            setLoading(false)
        })

    }

    function handleUpload(){

        setUploadMsg("Carregando...");
        setProgress(prevState => {
          return {...prevState, started: true}
        })
      
        const formData = new FormData()
        formData.append('file', imageUpload)
        formData.append('name', imageUpload.name)
      
        axios.post(`${url}/images`, formData,{
          onUploadProgress: (progressEvent) => {setProgress(prevState => {
            return { ...prevState, pc: progressEvent.progress*100}
          })}
        },
          {headers: {
            'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
                console.log(response)
                setThumbnail(response.data.response.src)
                setUploadMsg(response.data.msg)
                setProgress({started: false, pc: 0})
            })
            .catch(error => {
              setUploadMsg(error.response.data.msg)
              console.error("Erro ao enviar imagem:", error)
              setProgress({started: false, pc: 0})
            })
        }

    return(
        <div className={`container-fluid ${mode ? 'dark-mode' : 'light-mode'}`} style={{minHeight:'100vh'}}>
            <Header />
            <div className="container">
                <div className="row mb-2">
                    <div className="col-10 py-3">
                        <h2>Editar Usuário</h2>
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        <Link href={'/home'}>
                            <MdOutlineDashboardCustomize style={{width:'30px', height:'30px', color:'var(--color-dark-2)'}} />
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <h4>Imagem</h4>
                        {thumbnail ? (
                            <div style={{width:'200px', height:'250px'}}>
                                <Image className="rounded-4" src={thumbnail} alt="thumbnail" width={200} height={250} style={{width:'100%', height:'100%', objectFit:'cover'}}/>   
                            </div>
                        ) : (
                            <div style={{width:'200px', height:'250px'}}>
                                <Image className="rounded-4" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs867oiFI9uKZePrJlp5ccrk_PJOu1ABWO8hnIutySxpbwLIHe2VAHDTV6PFb7yua7UbA&usqp=CAU"} alt="thumbnail" width={200} height={250} style={{width:'100%', height:'100%', objectFit:'cover'}}/>   
                            </div>
                        )}
                        <div className="my-3 py-2 col-12 row rounded-pill" style={{backgroundColor:'var(--color-dark-2)', cursor:'pointer'}}>
                            <input
                            type="file" 
                            name="file"
                            onChange={(e) => {setImageUpload(e.target.files[0])}}
                            placeholder="Selecione sua imagem" 
                            className={`ps-5 col rounded-pill`}/>
                            <div className="col-1 my-auto me-2" onClick={handleUpload}><BiUpload className="text-success fs-3" /></div>
                        </div>
                        
                        {progress.started && <progress max="100" value={progress.pc}></progress>}
                        {uploadMsg && <span>{uploadMsg}</span>}

                    </div>

                    <div className="col-12 col-lg-6">
                        {name && (
                            <form onSubmit={handleUpdate}>
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
                                    onChange={(e) => setUserName(e.target.value)}
                                    ></input>
                                </div>
                                <input className='mt-3' type='submit' id='submit' value={"Atualizar usuário"}/>

                                { loading && <Loading />}

                                {!message ? null : (resStatus === 200 ? 
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;