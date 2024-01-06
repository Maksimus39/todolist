import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";


// типизация для Button кнопок
export type ButtonType = "all" | "active" | "completed"


function App() {

    // хранилище state
    let [tasks, setTasks] = useState<TasksType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "ReactJS", isDone: false},
        {id: 6, title: "ReactJS", isDone: false}
    ])


    // state filter
    let [filter, setFilter] = useState<ButtonType>("all")

    // функция удаления tasks
    function removeTask(idTask: number) {
        let filteredTask = tasks.filter(ts => ts.id !== idTask)
        console.log(filteredTask)
        setTasks([...filteredTask])
    }

    // блок кода filter
    let filteredTasks = tasks  // это все таски "all"

    if (filter === "active") {
        filteredTasks = tasks.filter(fl => !fl.isDone)
    }

    if (filter === "completed") {
        filteredTasks = tasks.filter(fl => fl.isDone)
    }

    // функция по фильтрации по кнопкам
    function changeFilter(value: ButtonType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}


export default App;
