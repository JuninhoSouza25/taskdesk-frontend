'use client'

import axios from "axios"
import { useState } from "react"
import { redirect } from 'next/navigation'

const CreateTask = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [expiry, setExpire] = useState('')
    const [status, setStatus] = useState('A fazer')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [resStatus, setResStatus] = useState()

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

        axios.post('http://localhost:3001/api/tasks', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.status)
            setMessage(response.data.msg)
            setResStatus(response.status)
            setLoading(false)
        })
        .catch(error => {
            setMessage('Ocorreu um erro ao criar a tarefa.')
            console.log(error)
        })

        setTitle('')
        setDescription('')
        setExpire('')
        setStatus('A fazer')

        redirect('/')
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-12 p-3">
                    <h1>Criar tarefa</h1>
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
            </div>
        </div>
    )
}
export default CreateTask