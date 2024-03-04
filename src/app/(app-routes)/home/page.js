'use client'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdListAlt, MdNoteAdd, MdOutlineViewKanban } from "react-icons/md";
import { changeTab } from "@/features/tab/tab-slice";
import Header from "@/app/components/Header";
import Dashboard from "@/app/components/Dashboard";
import Kanban from "@/app/components/Kanban";
import Footer from "@/app/components/Footer";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { fetchTasks } from "@/features/tasks/tasks-slice"; 

export default function Home() {
  const { data: session } = useSession();
  const mode = useSelector((state) => state.mode.value)
  const tab = useSelector((state) => state.tab.value)
  const tasks = useSelector((state) => state.tasks.value); 
  const loading = useSelector((state) => state.tasks.loading); 
  const tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"))
  const [localTasks, setLocalTasks] = useState(tasksLocalStorage)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('tasks', tasks)
    if(session){
      dispatch(fetchTasks());
      setLocalTasks(tasks)
      console.log('Localtasks',localTasks)
    }
  }, []);

  function handleChangeTab(tab){
    dispatch(changeTab(tab))
  }

  return (
    <div className={`container-fluid ${mode ? 'dark-mode' : 'light-mode'}`}>
      <Header />
        {localTasks && localTasks.length > 0 && (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="text-center">Visualização</h2>
                  <div className="d-flex justify-content-center align-items-center gap-3">
                      <div className={`button-tab ${tab === 'dashboard' ? 'focus' : null}`} onClick={() => handleChangeTab('dashboard')}>
                        <MdListAlt className="fs-1"/> Lista
                      </div>
                      <div className={`button-tab ${tab === 'kanban' ? 'focus' : null}`} onClick={() => handleChangeTab('kanban')}>
                            <MdOutlineViewKanban className="fs-1" /> Kanban
                      </div>
                  </div>
              </div>
            </div>
          </div>
        )}
        {localTasks && tab && (
          <div className="container">
            <div className="row">
              <div className="col-12">
                {tab === 'dashboard' && (
                  <Dashboard tasks={localTasks} title={"Dashboard"} />
                )}

                {tab === 'kanban' && (
                  <Kanban tasks={localTasks} title={"Kanban"}/>
                )}
              </div>
            </div>
          </div>
        )}
        {!localTasks && (
          <div className="container my-5" style={{height:'53vh'}}>
            <div className="row my-5">
              <div className="col-12 my-5">
                <h2 className="text-center">Você ainda não possui nenhuma tarefa criada!</h2>
              </div>
              <div className="row">
                <div className="col-12 text-center py-4">
                  <p className="fs-4 mb-0">Clique aqui e comece a utilizar o Task Desk:</p>
                </div>
                <div className="col-12 text-center mt-5">
                  <Link href={'/create-task'}><MdNoteAdd style={{width:'150px', height:'150px', color:'var(--color-success)'}}/></Link>
                </div>
              </div>
            </div>
          </div>
        )}
      <Footer />
    </div>
  );
}
