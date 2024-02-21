'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Kanban from "./components/Kanban";
import { MdListAlt, MdOutlineViewKanban } from "react-icons/md";
import { changeTab } from "@/features/tab/tab-slice";


export default function Home() {
  const mode = useSelector((state) => state.mode.value)
  const tab = useSelector((state) => state.tab.value)
  const dispatch = useDispatch()
  const [tasks, setTasks] = useState([])

  const getTasks = () => {
    axios.get('http://localhost:3001/api/tasks')
    .then(response => {
      console.log(response.data)
      setTasks(response.data)

    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getTasks()
  },[])

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
