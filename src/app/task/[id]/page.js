'use client'
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDeleteForever, MdOutlineDashboardCustomize } from "react-icons/md";
import ModalDelete from "@/app/components/ModalDelete";
import { useRouter } from 'next/navigation';

const Task = () => {

    const { id } = useParams()
    const [task, setTask] = useState({})
    const url = 'http://localhost:3001/api/task'
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
        console.log(title)
        console.log(description)
        console.log(expiry)
        console.log(status)

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('expiry', expiry)
        formData.append('status', status)

        axios.put(`http://localhost:3001/api/task/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.status)
            setMessage(response.data.msg)
            setResStatus(response.status)
            setLoading(false)
            getTasks()     
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

    function formatarData(dataString) {
        const data = new Date(dataString);
        const dia = String(data.getDate() + 1).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); 
        const ano = data.getFullYear();
        const fomatedData = `${ano}-${mes}-${dia}`;
        return fomatedData;
    }

    const getTasks = () => {
        axios.get(`${url}/${id}`)
        .then(respose => {
            console.log(respose.data)
            setTask(respose.data)
            setTitle(respose.data.title)
            setDescription(respose.data.description)
            setExpire(respose.data.expiry)
            setStatus(respose.data.status)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getTasks()
    },[])

    const deleteTask = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3001/api/task/${id}`)
        .then(response => {
            console.log(response)
            setIsModal(false)
            setMessage(response.data.msg)
            setResStatus(response.status)
            setTimeout(() => {
                push('/')
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
        <div className="container-fluid">

            {isModal && modal}

            {task && (
                <div className="container">
                    <div className="row p-3">
                        <div className="col-10">
                            <h1>{task.title}</h1>
                        </div>
                        <div className="col-2">
                            <Link href={'/'}>
                                <MdOutlineDashboardCustomize style={{width:'30px', height:'30px', color:'var(--color-danger)'}} />
                            </Link>
                        </div>
                    </div>
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
                                    <input type="date" id="expiry" required value={formatarData(expiry)} onChange={(e) => setExpire(e.target.value)}></input>
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
                            <div className="col-12 text-end" style={{position:'absolute', bottom:'15px', right:'15px'}} onClick={() => handleDelete(task)}>
                                <span className="text-danger fs-3 mb-0 mt-5">Apagar tarefa</span>
                                <MdDeleteForever className="text-danger" style={{width:'35px', height:'35px',cursor:'pointer'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Task;