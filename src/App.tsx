import './App.css'
import {Todolist} from "./Todolist.tsx";
import {useState} from "react";

export type FilteredTasks = "All" | "Active" | "Completed"
export const App = () => {
    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])
    const [filter, setFilter] = useState<FilteredTasks>("All")


    const deleteTask = (taskId: number) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    }

    let filteredTasks = tasks
    if (filter === "Active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "Completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const filteredTasksHandler = (value: FilteredTasks) => {
        setFilter(value)
    }

    return (
        <div className="app">
            <Todolist title={"What to learn"}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      filteredTasksHandler={filteredTasksHandler}
            />
        </div>
    )
}


export default App

