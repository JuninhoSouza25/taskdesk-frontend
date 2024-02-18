'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";


export default function Home() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks')
    .then(response => {
      console.log(response.data)
      setTasks(response.data)

    })
    .catch(error => console.log(error))
  },[])

  return (
    <>
      {tasks && (
        <Dashboard tasks={tasks}/>
      )}
    </>
  );
}
