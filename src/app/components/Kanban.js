import { useEffect, useState } from "react";
import { MdNoteAdd } from "react-icons/md";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ordenateDate } from "../utils/ordenateDate";
import CardKanban from "./CardKanban";
import { useRouter } from "next/navigation"; 

const Kanban = ({tasks, title}) => {
    const mode = useSelector((state) => state.mode.value)
    const [taskList, setTaskList] = useState([])
    const [originalTaskList, setOriginalTaskList] = useState([])
    const [ordenatedDate, setOrdenatedDate] = useState([])
    const { push } = useRouter()


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
        setOrdenatedDate(ordenateDate(limitedTasks))
    }

    useEffect(() => {
        fullTaskList()
    }, [tasks]);

    function handleLink(link){
        push(link)
    }


    return(
        <div className="container-fluid"  style={{minHeight:'550px'}}>
            {originalTaskList && (
                <div className="container">
                    <div className="row mb-2">
                        <div className="col-10 py-3">
                            <h2>{title}</h2>
                        </div>
                        <div className="col-2 d-flex justify-content-center align-items-center">
                            <Link href={'/create-task'}>
                                <MdNoteAdd style={{width:'30px', height:'30px', color:'var(--color-success)'}}/>
                            </Link>
                        </div>
                    </div>
                    <div className={`kanban-board row mb-4 ${mode ? 'dark-mode' : 'light-mode'}`}>
                        <div className="col-12 col-lg-4">
                            <div className="kanban-card">
                                <div className="col-12 text-center">
                                    <h5 className="fs-2 fw-bold">A fazer</h5>
                                </div>
                                <div className="col-12">
                                    {originalTaskList && originalTaskList.filter(item => item.status === 'A fazer').map((task) => (
                                        <CardKanban 
                                            key={task._id}
                                            title={task.title}
                                            date={task.expiry}
                                            status={task.status}
                                            action={() => handleLink(`/task/${task._id}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="kanban-card">
                                <div className="col-12 text-center">
                                    <h4 className="fs-2 fw-bold">Em progresso</h4>
                                </div>
                                <div className="col-12">
                                    {originalTaskList && originalTaskList.filter(item => item.status === 'Em progresso').map((task) => (
                                        <CardKanban 
                                            key={task._id}
                                            title={task.title}
                                            date={task.expiry}
                                            status={task.status}
                                            action={() => handleLink(`/task/${task._id}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="kanban-card">
                                <div className="col-12 text-center">
                                    <h4 className="fs-2 fw-bold">Finalizada</h4>
                                </div>
                                <div className="col-12">
                                    {originalTaskList && originalTaskList.filter(item => item.status === 'Finalizada').map((task) => (
                                        <CardKanban 
                                            key={task._id}
                                            title={task.title}
                                            date={task.expiry}
                                            status={task.status}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                
                    </div>
                
                </div>
            )}
        </div>
    )
}

export default Kanban;