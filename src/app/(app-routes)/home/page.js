'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MdListAlt, MdNoteAdd, MdOutlineViewKanban } from "react-icons/md";
import { changeTab } from "@/features/tab/tab-slice";
import Header from "@/app/components/Header";
import Dashboard from "@/app/components/Dashboard";
import Kanban from "@/app/components/Kanban";
import Footer from "@/app/components/Footer";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const mode = useSelector((state) => state.mode.value)
  const tab = useSelector((state) => state.tab.value)
  const dispatch = useDispatch()
  const [tasks, setTasks] = useState([])

  const url = process.env.URL_API

  useEffect(() => {
    if(session){
      getTasks()
    }
  },[session])

  const getTasks = () => {
    axios.get(`${url}/tasks/${session.user._id}`)
    .then(response => {
      setTasks(response.data)

    })
    .catch(error => console.log(error))
  }

  function handleChangeTab(tab){
    dispatch(changeTab(tab))
  }

  return (
    <div className={`container-fluid ${mode ? 'dark-mode' : 'light-mode'}`}>
      <Header />
        {tasks.length > 0 ? (
          <>
            <div className="container">
              <div className="row">
                <div className="col-6 text-end">
                      <MdListAlt className="fs-1" onClick={() => handleChangeTab('dashboard')}/>
                </div>
                <div className="col-6">
                      <MdOutlineViewKanban className="fs-1" onClick={() => handleChangeTab('kanban')}/>
                </div>
              </div>
            </div>
            {tasks && (
              tab && (
              <>
                {tab === 'dashboard' && (
                  <Dashboard tasks={tasks} title={"Dashboard"} />
                )}

                {tab === 'kanban' && (
                  <Kanban tasks={tasks} title={"Kanban"}/>
                )}
              </>
              
            )
            )}
          </>
        ) : (
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
