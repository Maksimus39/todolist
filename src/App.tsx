import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

// типизация для массива тудулистов
type TodolistType = {
    id: string
    title: string
    filter: ButtonType
}

// типизация для Button кнопок
export type ButtonType = "all" | "active" | "completed"


function App() {

    // функция удаления tasks
    function removeTask(idTask: string, todolistID: string) {
        setTasksObj({...tasksObj, [todolistID]: tasksObj[todolistID].filter(t => t.id != idTask)})
    }

    // функция по фильтрации по кнопкам
    function changeFilter(value: ButtonType, todolistID: string) {
        setTodolist(todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }

    // функция добавляющая таску addTask
    function addTask(title: string, todolistID: string) {
        // новая таска
        let task = {id: v1(), title: title, isDone: false}
        setTasksObj({...tasksObj, [todolistID]: [task, ...tasksObj[todolistID]]})
    }

    // функция для изменения чекбокса
    function changeTaskStatus(id: string, isDone: boolean, todolistID: string) {
        setTasksObj({
            ...tasksObj,
            [todolistID]: tasksObj[todolistID].map(ts => ts.id === id ? {...ts, isDone: isDone} : ts)
        })
    }

    // функция удаления todolist
    function removeTodolists(todolistID: string) {
        setTodolist(todolists.filter(tl => tl.id !== todolistID))
        delete tasksObj[todolistID]
        setTasksObj({...tasksObj})
    }

    // ключи для массивов
    let todolistID1 = v1()
    let todolistID2 = v1()


    // state для todolist
    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: "active"},
        {id: todolistID2, title: "What to buy", filter: "completed"}
    ])


    // state для tasks
    let [tasksObj, setTasksObj] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false}
        ]
    })


    return (
        <div className="App">
            {todolists.map((tl) => {

                // блок кода filter
                let filteredTasks = tasksObj[tl.id]  // это все таски "all"

                if (tl.filter === "active") {
                    filteredTasks = tasksObj[tl.id].filter(fl => !fl.isDone)
                }

                if (tl.filter === "completed") {
                    filteredTasks = tasksObj[tl.id].filter(fl => fl.isDone)
                }


                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolists={removeTodolists}
                />
            })}
        </div>
    );
}


export default App;
