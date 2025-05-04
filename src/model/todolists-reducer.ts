import type {FilterValues, Todolist} from '../App'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";



export const deleteTodolistAC = createAction<{ id: string }>('todolists/delete_todolist')
export const createTodolistAC = createAction('todolists/create_todolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})
export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolists/change_todolist_title')
export const changeTodolistFilterAC = createAction<{
    id: string,
    filter: FilterValues
}>('todolists/change_todolist_filter')

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, builder => {
    builder.addCase(deleteTodolistAC, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
    }).addCase(createTodolistAC, (state, action) => {
        state.push({...action.payload, filter: 'all'})
    }).addCase(changeTodolistTitleAC, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state[index].title = action.payload.title
    }).addCase(changeTodolistFilterAC,(state, action)=>{
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state[index].filter = action.payload.filter
    })
})