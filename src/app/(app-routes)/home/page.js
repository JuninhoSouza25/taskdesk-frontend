'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MdListAlt, MdOutlineViewKanban } from "react-icons/md";
import { changeTab } from "@/features/tab/tab-slice";
import Header from "@/app/components/Header";
import Dashboard from "@/app/components/Dashboard";
import Kanban from "@/app/components/Kanban";
import Footer from "@/app/components/Footer";
import { getUserSession } from "@/features/user-session/user-session"
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const mode = useSelector((state) => state.mode.value)
  const tab = useSelector((state) => state.tab.value)
  const userSession = useSelector((state) => state.userSession.value)
  const dispatch = useDispatch()
  const [tasks, setTasks] = useState([])

  const url = process.env.URL_API

  const getTasks = () => {
    axios.get(`${url}/tasks`)
    .then(response => {
      setTasks(response.data)

    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getTasks()
  },[])
  
  useEffect(() => {
    dispatch(getUserSession(session)) 
  },[session])

  function handleChangeTab(tab){
    dispatch(changeTab(tab))
  }

  return (
    <div className={`container-fluid ${mode ? 'dark-mode' : 'light-mode'}`} >
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-6 text-end">
                <MdListAlt className="fs-1" onClick={() => handleChangeTab('lista')}/>
          </div>
          <div className="col-6">
                <MdOutlineViewKanban className="fs-1" onClick={() => handleChangeTab('kanban')}/>
          </div>
        </div>
      </div>
      {tasks && (
        <>
          {tab === 'lista' && (
            <Dashboard tasks={tasks} />
          )}

          {tab === 'kanban' && (
            <Kanban tasks={tasks} />
          )}
        </>
        
      )}
      <Footer />
    </div>
  );
}
