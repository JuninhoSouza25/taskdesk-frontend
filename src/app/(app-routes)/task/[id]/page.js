'use client'
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDeleteForever, MdOutlineDashboardCustomize } from "react-icons/md";
import ModalDelete from "@/app/components/ModalDelete";
import { useRouter } from 'next/navigation';
import Header from "@/app/components/Header";
import { useSelector } from "react-redux";
import Footer from "@/app/components/Footer";

const Task = () => {
    const mode = useSelector((state) => state.mode.value)
    const { id } = useParams()
    const [task, setTask] = useState({})
    const url = process.env.URL_API
    const { push } = useRouter();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [expiry, setExpire] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [resStatus, setResStatus] = useState()
    const [isModal, setIsModal] = useState(false)
    const [modal, setModal] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        let expiryDate = null

        if(status === "Finalizada"){
            const today = new Date()
            expiryDate = formatarData(today)
        }else{
            expiryDate = expiry
        }

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('expiry', expiryDate)
        formData.append('status', status)

        axios.put(`${url}/task/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setMessage(response.data.msg)
            setResStatus(response.status)
            setLoading(false)
            getTasks()
            if(status ==="Finalizada"){
                setTimeout(() => {
                    push('/home')
                }, 500);
            }     
        })
        .catch(error => {
            setMessage('Ocorreu um erro ao criar a tarefa.')
            console.log(error)
        })
    }

    function formatarData(dataString) {
        const data = new Date(dataString);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); 
        const ano = data.getFullYear();
        const fomatedData = `${ano}-${mes}-${dia}`;
        return fomatedData;
    }

    const getTasks = () => {
        axios.get(`${url}/task/${id}`)
        .then(respose => {
            console.log(respose.data)
            setTask(respose.data)
            setTitle(respose.data.title)
            setDescription(respose.data.description)
            setExpire(formatarData(respose.data.expiry))
            setStatus(respose.data.status)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getTasks()
    },[])

    const deleteTask = (id) => {
        console.log(id)
        axios.delete(`${url}/task/${id}`)
        .then(response => {
            setIsModal(false)
            setMessage(response.data.msg)
            setResStatus(response.status)
            setTimeout(() => {
                push('/home')
            }, 1000);
        })
        .catch(error => console.log(error))

    }

    const handleDelete = (task) => {
        console.log('click', task)
        setIsModal(true)
        setModal(<ModalDelete task={task.title} function1={() => deleteTask(id)} function2={() => setIsModal(false)} />)
    }

    return(
        <div className={`container-fluid ${mode ? 'dark-mode' : 'light-mode'}`}>
            <Header />

            {isModal && modal}

            {task && (
                <div className="container">
                    <div className="row p-3">
                        <div className="col-10">
                            <h1>Editar tarefa</h1>
                        </div>
                        <div className="col-2">
                            <Link href={'/home'}>
                                <MdOutlineDashboardCustomize style={{width:'30px', height:'30px', color:'var(--color-dark-2)'}} />
                            </Link>
                        </div>
                    </div>

                    {task.status !== 'Finalizada' ? (
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <form onSubmit={handleSubmit}>
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
                                    {!loading ? <input type="submit" id="submit" value={"Atualizar tarefa"}/> : <input type="submit" className="bg-body" id="submit" disabled value={"Desabilitado"}/>}
                                    {!message ? null : (resStatus === 200 ? 
                                        (
                                        <div className="col-12 text-center">
                                            <p className="text-success">{message}</p>
                                        </div>
                                    ) : (
                                        (
                                        <div className="col-12 text-center">
                                            <p className="text-danger">{message}</p>
                                        </div>
                                    )
                                    )
                                    )}
                                    
                                </form>

                            </div>
                            <div className="container">
                                <div className="col-12 text-end" style={{position:'relative', bottom:'15px', right:'15px',cursor:'pointer'}} onClick={() => handleDelete(task)}>
                                    <MdDeleteForever style={{width:'35px', height:'35px', color:'var(--color-dark-2)'}}/>
                                </div>
                            </div>
                        </div>
                    ): (
                        <div className="row my-5 d-flex justify-content-center" style={{height:'47vh'}}>
                            <div className="col-4 my-5">
                                <h2 className="mb-5">{title}</h2>
                                <p>{description}</p>
                                <p className="mb-5">{`Tarefa finalizada em: ${expiry}`}</p>
                                <span className="fs-5 mt-5 fw-normal text-danger">Tarefa finalizada, não pode ser editada!</span>
                            </div>
                        </div>
                    )}

 
                </div>
            )}

            <Footer />
        </div>
    )
}
export default Task;