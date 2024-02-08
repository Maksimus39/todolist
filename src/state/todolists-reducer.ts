import {TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: TodolistsReducerType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolistID = v1()
            let newTodolist: TodolistType = {id: newTodolistID, title: action.payload.title, filter: 'all'}


            return [...state,newTodolist]
        }
        default:
            return state

    }
}

// общая типизация для редюсера action
type TodolistsReducerType = removeTodolistsACType | addTodolistACType


// это тип для removeTodolistsACType
type removeTodolistsACType = ReturnType<typeof removeTodolistsAC>
export const removeTodolistsAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

// это тип для addTodolist
type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload:{
            title
        }
    } as const
}

