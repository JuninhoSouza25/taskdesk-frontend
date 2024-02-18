export async function TaskFetch(){
    const response = await fetch('http://localhost:3001/api/tasks')
    const tasks = await response.json()

    return tasks
}