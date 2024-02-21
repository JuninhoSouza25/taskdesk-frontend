import { useEffect, useState } from "react";
import CardDash from "./CardDash";
import { MdOutlineMoreHoriz, MdNoteAdd, MdOutlineDateRange } from "react-icons/md";
import bg1 from '@/assets/images/bg-1.jpg'
import bg2 from '@/assets/images/bg-2.jpg'
import bg3 from '@/assets/images/bg-3.jpg'
import bg4 from '@/assets/images/bg-4.jpg'
import Link from "next/link";
import { useSelector } from "react-redux";
import { stringToSlug } from "../utils/stringToSlug";
import { formatarData } from "../utils/formateDate";


const Kanban = ({tasks}) => {
    const mode = useSelector((state) => state.mode.value)
    const [taskList, setTaskList] = useState([])
    const [originalTaskList, setOriginalTaskList] = useState([])


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



    return(
        <div className="container-fluid">
            <div className="container">
                <div className="row mb-2">
                    <div className="col-10 py-3">
                        <h1>Kanban</h1>
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
                                <h4 className="fs-2 fw-bold">A fazer</h4>
                            </div>
                            <div className="col-12">
                                {originalTaskList && originalTaskList.filter(item => item.status === 'A fazer').map((task) => (
                                    <Link  key={task._id} className="card mb-3 p-4" href={`/task/${task._id}`}>
                                        <div className="row">
                                            <div className="col-8 fs-5">
                                                <h5 className="fw-bold">{task.title}</h5>
                                            </div>

                                            <div className="col-3 fs-5">
                                                <div className="row">
                                                    <div className="col"></div>
                                                    <div className="col-1 text-end mb-5">
                                                        <MdOutlineMoreHoriz className="icon"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-3"> 
                                                <div className="fs-6 mb-0 lh-sm"><MdOutlineDateRange className="fs-3 mb-2"/> {formatarData(task.expiry)}</div>
                                            </div>
                                            <div className="col"></div>
                                            <div className="col-5 fs-6">
                                                <div className={`status fw-bold ${stringToSlug(task.status)}`}>{task.status}</div>
                                            </div>
                                        </div>
                                    </Link>
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
                                    <Link  key={task._id} className="card mb-3 p-4" href={`/task/${task._id}`}>
                                        <div className="row">
                                            <div className="col-8 fs-5">
                                                <h5 className="fw-bold">{task.title}</h5>
                                            </div>

                                            <div className="col-3 fs-5">
                                                <div className="row">
                                                    <div className="col"></div>
                                                    <div className="col-1 text-end mb-5">
                                                        <MdOutlineMoreHoriz className="icon"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-3"> 
                                                <div className="fs-6 mb-0 lh-sm"><MdOutlineDateRange className="fs-3 mb-2"/> {formatarData(task.expiry)}</div>
                                            </div>
                                            <div className="col"></div>
                                            <div className="col-5 fs-6">
                                                <div className={`status fw-bold ${stringToSlug(task.status)}`}>{task.status}</div>
                                            </div>
                                        </div>
                                    </Link>
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
                                    <Link  key={task._id} className="card mb-3 p-4" href={`/task/${task._id}`}>
                                        <div className="row">
                                            <div className="col-8 fs-5">
                                                <h5 className="fw-bold">{task.title}</h5>
                                            </div>

                                            <div className="col-3 fs-5">
                                                <div className="row">
                                                    <div className="col"></div>
                                                    <div className="col-1 text-end mb-5">
                                                        <MdOutlineMoreHoriz className="icon"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-3"> 
                                                <div className="fs-6 mb-0 lh-sm"><MdOutlineDateRange className="fs-3 mb-2"/> {formatarData(task.expiry)}</div>
                                            </div>
                                            <div className="col"></div>
                                            <div className="col-5 fs-6">
                                                <div className={`status fw-bold ${stringToSlug(task.status)}`}>{task.status}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

            
                </div>
               
            </div>
        </div>
    )
}

export default Kanban;