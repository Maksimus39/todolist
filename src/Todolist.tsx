import React, {ChangeEvent} from "react";
import {ButtonType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
    changeTaskTitle: (id: string, newTitle: string, todolistID: string) => void
    changeTodolistTitle:(todolistID: string,newTitle: string)=>void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

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

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>X</button>
            </h3>


            <AddItemForm addItem={addTask}/>

            <ul>
                {props.tasks.map((task) => {
                    // function onClick
                    const onClickHandler = () => {
                        props.removeTask(task.id, props.id)
                    }
                    // смена чекбокс
                    const onChangeStatusInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                    }

                    const onChangeTitleInputHandler = (newValue: string) => {
                        props.changeTaskTitle(task.id, newValue, props.id)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onChangeStatusInputHandler}
                            />

                            {/*<span>{task.title}</span>*/}
                            <EditableSpan title={task.title} onChange={onChangeTitleInputHandler}/>


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



