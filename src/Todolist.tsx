import React, {ChangeEvent} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             todolistId,
                             removeTodolist,
                             updateTask,
                             updateTodolist
                         }: PropsType) => {

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }


    const addTaskCallback = (title: string) => {
        addTask(title, todolistId)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={updateTodolistHandler}/>
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </h3>

            <div>

                <AddItemForm addItem={addTaskCallback}/>

            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {

                        const removeTaskHandler = () => {
                            removeTask(task.id, todolistId)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, todolistId)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            updateTask(todolistId, task.id, title)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>

                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                <Button title={'X'} onClick={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}