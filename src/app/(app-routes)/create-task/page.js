'use client'
import axios from "axios"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import Link from "next/link"
import { MdOutlineDashboardCustomize } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSession } from "next-auth/react";
import { uploadTasks } from "@/features/tasks/tasks-slice"; 

const CreateTask = () => {
  const { data: session } = useSession();
    const mode = useSelector((state) => state.mode.value)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [expiry, setExpire] = useState('')
    const [status, setStatus] = useState('A fazer')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [resStatus, setResStatus] = useState()
    const tasks = useSelector((state) => state.tasks.value); 

    const dispatch = useDispatch()
    const { push } = useRouter();

    const url = process.env.URL_API

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('title', title.trim())
        formData.append('description', description)
        formData.append('user_id', session.user._id)
        formData.append('expiry', expiry)
        formData.append('status', status)

        axios.post(`${url}/tasks`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setMessage(response.data.msg)
            setResStatus(response.status)
            setLoading(false)
            dispatch(uploadTasks(tasks))
            setTimeout(() => {
                push('/home')
              }, 500);
            
        })
        .catch(error => {
            setMessage('Ocorreu um erro ao criar a tarefa.')
            console.log(error)
        })

        setTitle('')
        setDescription('')
        setExpire('')
        setStatus('A fazer')

    }

    return(
        <div className={`container-fluid ${mode ? 'dark-mode' : 'light-mode'}`}>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-10 p-3">
                        <h2>Criar tarefa</h2>
                    </div>
                    <div className="col-2 p-3">
                        <Link href={'/home'}>
                            <MdOutlineDashboardCustomize style={{width:'30px', height:'30px', color:'var(--color-dark-2)'}} />
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center my-5">
                        <form onSubmit={handleSubmit} className="mb-5">
                            <div className="col">
                                <label className="col-12">Título da tarefa</label>
                                <input type="text" id="title" placeholder="Título da tarefa" required value={title} onChange={(e) => setTitle(e.target.value)}></input>
                            </div>
                            <div className="col">
                                <label className="col-12">Descrição da tarefa</label>
                                <textarea id="description" rows={4} cols={50} placeholder="Descrição da tarefa" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <div className="col">
                                <label className="col-12">Data de vencimento</label>
                                <input type="date" id="expiry" required value={expiry} onChange={(e) => setExpire(e.target.value)}></input>
                            </div>
                            <div className="col">
                                <label className="col-12">Status:</label>
                                <select name="status" id="status"  value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="A fazer">A fazer</option>
                                    <option value="Em progresso">Em progresso</option>
                                    <option value="Finalizada">Finalizada</option>
                                </select>
                            </div>
                            {!loading ? <input type="submit" id="submit" value={"Criar tarefa"}/> : <input type="submit" id="submit" disabled value={"Criar tarefa"}/>}
                            {!message ? null : (resStatus === 201 ? 
                                (
                                <div className="col-12 text-center">
                                    <p className="fs-3 text-success">{message}</p>
                                </div>
                            ) : (
                                (
                                <div className="col-12 text-center">
                                    <p className="fs-3 text-danger">{message}</p>
                                </div>
                            )
                            )
                            )}
                            
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default CreateTask