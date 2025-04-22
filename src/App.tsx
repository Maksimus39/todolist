import './App.css'
import {TasksType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilteredTasks = "All" | "Active" | "Completed"
export const App = () => {
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])
    const [filter, setFilter] = useState<FilteredTasks>("All")


    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    }
    const filteredTasksHandler = (value: FilteredTasks) => {
        setFilter(value)
    }
    const createTask = (taskTitle: string) => {
        const newTask: TasksType = {id: v1(), title: taskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const task = tasks.map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks(task)
    }


    let filteredTasks = tasks
    if (filter === "Active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "Completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    }


    return (
        <div className="app">
            <Todolist title={"What to learn"}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      filteredTasksHandler={filteredTasksHandler}
                      createTask={createTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    )
}


export default App

