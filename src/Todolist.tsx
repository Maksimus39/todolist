import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ButtonType} from "./App";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (idTask: string) => void
    changeFilter: (value: ButtonType) => void
    addTask: (title: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    // хук useState для добавления в input значений
    const [title, setTitle] = useState("")

    // function addTask
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }

    // function onChange
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    // function onKeyPressHandler
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    // набор функций для фильтрации по кнопкам
    const onClickAllButton = () => {
        props.changeFilter("all")
    }
    const onClickActiveButton = () => {
        props.changeFilter("active")
    }
    const onClickCompletedButton = () => {
        props.changeFilter("completed")
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTaskHandler}>Add task</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    // function onClick
                    const onClickHandler = () => {
                        props.removeTask(task.id)
                    }

                    return (
                        <li>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>✖️</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onClickAllButton}>All</button>
                <button onClick={onClickActiveButton}>Active</button>
                <button onClick={onClickCompletedButton}>Completed</button>
            </div>
        </div>
    )
}