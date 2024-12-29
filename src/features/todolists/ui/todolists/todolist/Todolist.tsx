import React from "react";
import {AddItemForm} from "../../../../../common/components/AddItemForm";
import {TodolistType} from "../../../../../app/App";
import {FilterTasksButtons} from "./filterTasksButton/FilterTasksButtons";
import {Tasks} from "./tasks/Tasks";
import {TodolistTitle} from "./todolistTitle/TodolistTitle";
import {addTaskAC} from "../../../model/__tests__/tasks-reducer";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";


export type PropsType = {
    todolist: TodolistType
}

export const Todolist = ({todolist}: PropsType) => {

    const dispatch = useAppDispatch()

    const addTaskCallback = (title: string) => {
        dispatch(addTaskAC({title: title, todolistId: todolist.id}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>

        </div>
    )
}