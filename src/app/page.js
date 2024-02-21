'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";


export default function Home() {
  const mode = useSelector((state) => state.mode.value)
  const [tasks, setTasks] = useState([])
  const [status, setStatus ] = useState('Total')

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

  return (
    <div className={`container-fluid ${mode ? 'dark-mode' : 'light-mode'}`} >
      <Header />
      {tasks && (
        <Dashboard tasks={tasks}/>
      )}
      <Footer />
    </div>
  );
}
