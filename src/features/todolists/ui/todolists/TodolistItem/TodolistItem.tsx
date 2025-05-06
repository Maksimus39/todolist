import {Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {createTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistTitle} from "@/features/todolists/ui/todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "@/features/todolists/ui/todolists/TodolistItem/Tasks/Tasks.tsx";
import {FilterButtons} from "@/features/todolists/ui/todolists/TodolistItem/FilterButtons/FilterButtons.tsx";
import { CreateItemForm } from "@/common/CreateItemForm/CreateItemForm";

type Props = {
    todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {
    const {id} = todolist

    // useDispatch
    const dispatch = useAppDispatch()


    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}
