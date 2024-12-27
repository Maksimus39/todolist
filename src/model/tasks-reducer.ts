import {TasksStateType} from '../App'
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'TASKS-REDUCER/REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "TASKS-REDUCER/ADD-TASK": {
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false,
            }
            return {
                ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case "TASKS-REDUCER/CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        }
        case "TASKS-REDUCER/CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.todolistId ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        }
        case "TODOLIST-REDUCER/ADD-TODOLIST": {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'TODOLIST-REDUCER/REMOVE-TODOLIST': {
            const { [action.payload.id]: _, ...rest } = state;
            return rest;
        }
        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => {
    return {type: 'TASKS-REDUCER/REMOVE-TASK', payload} as const
}
export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return {type: 'TASKS-REDUCER/ADD-TASK', payload} as const
}
export const changeTaskStatusAC = (payload: { taskId: string, isDone: boolean, todolistId: string }) => {
    return {type: 'TASKS-REDUCER/CHANGE-TASK-STATUS', payload} as const
}

export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
    return {type: 'TASKS-REDUCER/CHANGE-TASK-TITLE', payload} as const
}


// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType