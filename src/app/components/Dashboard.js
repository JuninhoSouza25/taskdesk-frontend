import { useEffect, useState } from "react";
import CardDash from "./CardDash";
import { MdOutlineMoreHoriz, MdNoteAdd, MdOutlineDateRange } from "react-icons/md";
import bg1 from '@/assets/images/bg-1.jpg'
import bg2 from '@/assets/images/bg-2.jpg'
import bg3 from '@/assets/images/bg-3.jpg'
import bg4 from '@/assets/images/bg-4.jpg'
import Link from "next/link";
import { useSelector } from "react-redux";


const Dashboard = ({tasks}) => {
    const mode = useSelector((state) => state.mode.value)
    const [taskList, setTaskList] = useState([])
    const [originalTaskList, setOriginalTaskList] = useState([])


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

    function formatarData(dataString) {
        const data = new Date(dataString);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); 
        const ano = data.getFullYear();
        const fomatedData = `${dia}-${mes}-${ano}`;
        return fomatedData;
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
                        <h1>Dashboard</h1>
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        <Link href={'/create-task'}>
                            <MdNoteAdd style={{width:'30px', height:'30px', color:'var(--color-success)'}}/>
                        </Link>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-10">
                        <h3>Resumo das tarefas</h3>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-6 col-lg-3 my-2">
                        <CardDash title={'Total de tarefas'} bg={bg1} 
                        data={originalTaskList.length}
                        onClick={() => setTaskList(originalTaskList)}
                        />
                    </div>
                    <div className="col-6 col-lg-3 my-2">
                        <CardDash title={'A fazer'} bg={bg2} 
                        data={originalTaskList.filter(item => item.status === 'A fazer').length}
                        onClick={() => filterTaskList('A fazer')}
                        />
                    </div>
                    <div className="col-6 col-lg-3 my-2">
                        <CardDash title={'Em progresso'} bg={bg3} 
                        data={originalTaskList.filter(item => item.status === 'Em progresso').length}
                        onClick={() => filterTaskList('Em progresso')}
                        />
                    </div>
                    <div className="col-6 col-lg-3 my-2">
                        <CardDash title={'Finalizadas'} bg={bg4} 
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
                <div className={`dashboard-list ${mode ? 'dark-mode' : 'light-mode'}`}>
                    <div className="dashboard-list-overflow">
                    {taskList && taskList.map((item, i) => (
                        <Link  key={i} className="card mb-3 p-4" href={`/task/${item._id}`}>
                            <div className="row">
                                <div className="col-8 fs-3">
                                    <h3 className="fw-bold">{item.title}</h3>
                                </div>

                                <div className="col-3 fs-3">
                                    <div className="row">
                                        <div className="col"></div>
                                        <div className="col-1 text-end mb-5">
                                            <MdOutlineMoreHoriz className="text-body" style={{cursor:'pointer'}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-5">
                                <div className="col-1"><MdOutlineDateRange className="fs-3"/></div>
                                <div className="col-3 fs-5 mb-0">{formatarData(item.expiry)}</div>
                                <div className="col"></div>
                                <div className="col-5 fs-5">
                                    <div className={`status fw-bold ${stringToSlug(item.status)}`}>{item.status}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard;