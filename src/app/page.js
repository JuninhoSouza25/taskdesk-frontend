'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";


export default function Home() {

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
    <>
      {tasks && (
        <Dashboard tasks={tasks} action={() => getTasks()}/>
      )}
    </>
  );
}
