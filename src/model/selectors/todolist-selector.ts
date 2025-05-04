import {RootState} from "../../app/store.ts";
import {Todolist} from "../../App.tsx";

export const selectTodolists = (state: RootState): Todolist[] => state.todolists