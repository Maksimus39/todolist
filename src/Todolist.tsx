import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

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
                             removeTodolist
                         }: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim(), todolistId)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }


    return (
        <div>
            <h3>{title}
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </h3>

            <div>
                <input value={taskTitle}
                       className={error ? 'error' : ''}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}
                />

                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
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

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>

                                <span>{task.title}</span>
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