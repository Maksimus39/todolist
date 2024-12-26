import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const todolistID1 = v1()
const todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]


export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'TODOLIST-REDUCER/REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'TODOLIST-REDUCER/ADD-TODOLIST': {
            const todolistId = v1();
            const newTodolist: TodolistType = {id: todolistId, title: action.payload.title, filter: 'all'};
            return ([newTodolist, ...state]);
        }
        case 'TODOLIST-REDUCER/CHANGE-TODOLIST-TITLE': {
            return state.map(tl => (tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl))
        }
        case 'TODOLIST-REDUCER/CHANGE-TODOLIST-FILTER': {
            return state.map(tl => (tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl))
        }
        default:
            return state
    }
}

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'TODOLIST-REDUCER/REMOVE-TODOLIST',
    payload: {
        id: string
    }
}
export type AddTodolistActionType = {
    type: 'TODOLIST-REDUCER/ADD-TODOLIST'
    payload: {
        title: string
    }
}
export type ChangeTodolistTitleActionType = {
    type: 'TODOLIST-REDUCER/CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}
export type ChangeTodolistFilterActionType = {
    type: 'TODOLIST-REDUCER/CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'TODOLIST-REDUCER/REMOVE-TODOLIST', payload: {id: todolistId}} as const
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'TODOLIST-REDUCER/ADD-TODOLIST', payload: {title}} as const
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'TODOLIST-REDUCER/CHANGE-TODOLIST-TITLE', payload: {id, title}} as const
}
export const changeTodolistFilterAC=(id:string,filter:FilterValuesType):ChangeTodolistFilterActionType=>{
    return{type:'TODOLIST-REDUCER/CHANGE-TODOLIST-FILTER',payload:{id,filter}} as const
}