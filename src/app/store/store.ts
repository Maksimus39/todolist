import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../../features/todolists/model/__tests__/tasks-reducer";
import {todolistsReducer} from "../../features/todolists/model/__tests__/todolists-reducer";
import {appReducer} from "../app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    theme: appReducer,
})

export const store = legacy_createStore(rootReducer)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>