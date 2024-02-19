import { useEffect, useState } from "react";
import CardDash from "./CardDash";
import { MdDeleteForever, MdEditDocument  } from "react-icons/md";
import axios from "axios";
import ModalDelete from "./ModalDelete";

const Dashboard = ({tasks, action}) => {

    const [taskList, setTaskList] = useState([])
    const [originalTaskList, setOriginalTaskList] = useState([])
    const [isModal, setIsModal] = useState(false)
    const [modal, setModal] = useState('')

    function stringToSlug(str) {
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
        str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        str = str.replace(/[^\w\s-]/g, ''); 
        str = str.replace(/\s+/g, '-');
        str = str.replace(/--+/g, '-');
        return str;
      }

    const fullTaskList = () => {
        let count = 0;
        const limitedTasks = [];
        tasks.map(item => {
            if (count < 50) {
                limitedTasks.push(item);
                count++;
            }
        });
        setTaskList(limitedTasks);
        setOriginalTaskList(limitedTasks);
    }

    useEffect(() => {
        fullTaskList()
    }, [tasks]);

    const filterTaskList = (status) => {
        const originalTasks = [...originalTaskList];
        const filteredTasks = originalTasks.filter(item => item.status === status);
        setTaskList(filteredTasks);
    }

    const deleteTask = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3001/api/task/${id}`)
        .then(response => {
            console.log(response)
            action()
            setTaskList(taskList.filter(item => item._id !== id))
            setIsModal(false)
        })
        .catch(error => console.log(error))

    }

    const handleDelete = (task) => {
        console.log('click', task)
        setIsModal(true)
        setModal(<ModalDelete task={task.title} function1={() => deleteTask(task._id)} function2={() => setIsModal(false)} />)
    }

    return(
        <div className="container">

            {isModal && modal}

            <div className="row mb-2">
                <div className="col-12 p-3">
                    <h1>Dashboard</h1>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-12">
                    <h3>Resumo das tarefas</h3>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-6 col-lg-3 my-2">
                    <CardDash title={'Total de tarefas'} bg={'bg-1'} 
                    data={originalTaskList.length}
                    onClick={() => setTaskList(originalTaskList)}
                    />
                </div>
                <div className="col-6 col-lg-3 my-2">
                    <CardDash title={'A fazer'} bg={'bg-2'} 
                    data={originalTaskList.filter(item => item.status === 'A fazer').length}
                    onClick={() => filterTaskList('A fazer')}
                    />
                </div>
                <div className="col-6 col-lg-3 my-2">
                    <CardDash title={'Em progresso'} bg={'bg-3'} 
                    data={originalTaskList.filter(item => item.status === 'Em progresso').length}
                    onClick={() => filterTaskList('Em progresso')}
                    />
                </div>
                <div className="col-6 col-lg-3 my-2">
                    <CardDash title={'Finalizadas'} bg={'bg-4'} 
                    data={originalTaskList.filter(item => item.status === 'Finalizada').length}
                    onClick={() => filterTaskList('Finalizada')}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <h3>Listagem de tarefas</h3>
                </div>
            </div>
            <div className="dashboard-list">
                <div className="row">
                    <div className="col-4 text-center">
                        <h3>Tarefa</h3>
                    </div>
                    <div className="col-4 text-center">
                        <h3>Status</h3>
                    </div>
                    <div className="col-4 text-center">
                        <h3>Ações</h3>
                    </div>
                </div>
                <div className="dashboard-list-overflow">
                {taskList && taskList.map((item, i) => (
                    <div key={i} className="row mb-2 pb-2 pt-2 border-bottom">
                        <div className="col-4 fs-3">{item.title}</div>
                        <div className="col-4 fs-3">
                            <div className={`status ${stringToSlug(item.status)}`}>{item.status}</div>
                        </div>
                        <div className="col-4 fs-3">
                            <div className="row">
                                <div className="col-6 text-end">
                                    <MdEditDocument className="text-gray" />
                                </div>
                                <div className="col-6 text-start" onClick={() => handleDelete(item)}>
                                    <MdDeleteForever className="text-danger" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>

        </div>
    )
}

export default Dashboard;