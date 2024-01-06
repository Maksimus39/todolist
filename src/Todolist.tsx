import React from "react";
import {ButtonType} from "./App";


export type TasksType = {
    id: number
    title: string
    isDone: boolean
}


type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (idTask: number) => void
    changeFilter: (value: ButtonType) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => props.removeTask(task.id)}>✖️</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}