import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts";
import {BaseResponse} from "@/common/types";
import {instance} from "@/common/instance";

export const todolistsApi = {
    getTodolist() {
        return instance.get<Todolist[]>('/todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<BaseResponse<{ item: Todolist }>>('/todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponse>(`/todo-lists/${todolistId}`)
    },
    changeTodolistTitle(todolistId: string, title: string) {
        return instance.put<BaseResponse>(`/todo-lists/${todolistId}`, {title})
    }
}