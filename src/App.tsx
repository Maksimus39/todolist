import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";


// типизация для Button кнопок
export type ButtonType = "all" | "active" | "completed"


function App() {

    // хранилище state
    let [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false}
    ])


    // state filter
    let [filter, setFilter] = useState<ButtonType>("all")

    // функция удаления tasks
    function removeTask(idTask: string) {
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

    // функция добавляющая таску addTask
    function addTask(title: string) {
        // новая таска
        let task = {id: v1(), title: title, isDone: false}
        // логика добавления этой таски
        setTasks([task, ...tasks])
    }

    // функция для изменения чекбокса
    function changeTaskStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}


export default App;
