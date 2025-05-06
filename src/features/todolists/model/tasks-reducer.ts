import {createTodolistAC, deleteTodolistAC} from './todolists-reducer.ts'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";


export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type TasksState = Record<string, Task[]>

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/delete_task')
export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/create_task')
export const changeTaskStatusAC = createAction<{
    todolistId: string,
    taskId: string,
    isDone: boolean
}>('tasks/change_task_status')
export const changeTaskTitleAC = createAction<{
    todolistId: string,
    taskId: string,
    title: string
}>('tasks/change_task_title')

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            const {todolistId, taskId} = action.payload;
            state[todolistId] = state[todolistId].filter(task => task.id !== taskId);
        })
        .addCase(createTaskAC, (state, action) => {
            const { todolistId, title } = action.payload;
            const newTask: Task = { title, isDone: false, id: nanoid() };
            state[todolistId].unshift(newTask);
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const { todolistId, taskId, isDone } = action.payload;
            const task = state[todolistId].find(task => task.id === taskId);
            if (task) {
                task.isDone = isDone;
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const { todolistId, taskId, title } = action.payload;
            const task = state[todolistId].find(task => task.id === taskId);
            if (task) {
                task.title = title;
            }
        });
})