import React, {ChangeEvent} from "react";
import {ButtonType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


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
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
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
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>


            <AddItemForm addItem={addTask}/>

            <div>
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
                        <div key={task.id} className={task.isDone ? "is-done" : ""}>
                            <Checkbox checked={task.isDone} onChange={onChangeStatusInputHandler} />
                            <EditableSpan title={task.title} onChange={onChangeTitleInputHandler}/>
                            <IconButton onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button color={"inherit"} variant={props.filter === "all" ? "contained" : "text"}
                        onClick={onClickAllButton}>All</Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onClickActiveButton}>Active</Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onClickCompletedButton}>Completed</Button>
            </div>
        </div>
    )
}



