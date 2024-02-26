import { useEffect, useState } from "react";
import CardDash from "./CardDash";
import {MdNoteAdd} from "react-icons/md";
import bg1 from '@/assets/images/bg-1.jpg'
import bg2 from '@/assets/images/bg-2.jpg'
import bg3 from '@/assets/images/bg-3.jpg'
import bg4 from '@/assets/images/bg-4.jpg'
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CardListDashboard from "./CardListDashboard";


const Dashboard = ({tasks, title}) => {
    const mode = useSelector((state) => state.mode.value)
    const [taskList, setTaskList] = useState([])
    const [originalTaskList, setOriginalTaskList] = useState([])
    const [ordenatedList, setOrdenatedList] = useState([])
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
    }

    useEffect(() => {
        fullTaskList()
        ordenateDate(tasks)
    }, [tasks]);

    const filterTaskList = (status) => {
        const originalTasks = [...originalTaskList];
        const filteredTasks = originalTasks.filter(item => item.status === status);
        setTaskList(filteredTasks);
    }

    
    function handleLink(link){
        push(link)
    }

    function ordenateDate(array) {
        array.sort(function(a, b) {
            var dataA = new Date(a.createdAt);
            var dataB = new Date(b.createdAt);
            return dataB - dataA;
        });
        setOrdenatedList(array)
    }



    return(
        <div className="container-fluid">
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
                <div className="row mb-2">
                    <div className="col-10">
                        <h4>Resumo das tarefas</h4>
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
                        <h4>Listagem de tarefas</h4>
                    </div>
                </div>
                <div className={`dashboard-list ${mode ? 'dark-mode' : 'light-mode'}`}>
                    <div className="dashboard-list-overflow">
                        {ordenatedList && ordenatedList.map((item, i) => (
                            <CardListDashboard key={i} item={item} action={() => handleLink(`/task/${item._id}`)}/>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard;