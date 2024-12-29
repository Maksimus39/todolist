import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../../model/tasks-reducer";
import {todolistsReducer} from "../../model/todolists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>