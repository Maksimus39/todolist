import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ButtonType} from "./App";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


type TodolistPropsType = {
    id: string
    title: string
    tasks: TasksType[]
    filter: ButtonType
    removeTask: (idTask: string, todolistID: string) => void
    changeFilter: (value: ButtonType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistID: string) => void
    removeTodolists: (todolistID: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    // хук useState для добавления в input значений
    const [title, setTitle] = useState("")

    // хук для обработки ошибки
    const [error, setError] = useState<string | null>(null)


    // function addTask
    const addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.id)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    // function onChange
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    // function onKeyPressHandler
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    // набор функций для фильтрации по кнопкам
    const onClickAllButton = () => {
        props.changeFilter("all", props.id)
    }
    const onClickActiveButton = () => {
        props.changeFilter("active", props.id)
    }
    const onClickCompletedButton = () => {
        props.changeFilter("completed", props.id)
    }
    // функция удаления todolist
    const removeTodolist = () => {
        props.removeTodolists(props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>X</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTaskHandler}>Add task</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((task) => {
                    // function onClick
                    const onClickHandler = () => {
                        props.removeTask(task.id, props.id)
                    }
                    // смена чекбокс
                    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onChangeInputHandler}
                            />
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>✖️</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onClickAllButton}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onClickActiveButton}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onClickCompletedButton}>Completed
                </button>
            </div>
        </div>
    )
}