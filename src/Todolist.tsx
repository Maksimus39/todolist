import Button from "./Button.tsx";
import {FilteredTasks} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type TasksType = {
    id: string,
    title: string
    isDone: boolean
}

type Props = {
    title: string
    tasks: TasksType[]
    deleteTask: (taskId: string) => void
    filteredTasksHandler: (value: FilteredTasks) => void
    createTask: (taskTitle: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
    filter: FilteredTasks
}
export const Todolist = ({
                             title,
                             tasks,
                             deleteTask,
                             filteredTasksHandler,
                             createTask,
                             changeTaskStatus,
                             filter
                         }: Props) => {

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            createTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={onChangeTaskHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
                />
                <Button title={"+"}
                        onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (<ul>
                {tasks.map(task => {

                    const deleteTaskHandler = () => {
                        deleteTask(task.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        changeTaskStatus(task.id, newStatusValue)
                    }
                    return (
                        <li key={task.id} className={task.isDone?"is-done":""}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={changeTaskStatusHandler}
                            />
                            <span>{task.title}</span>
                            <Button title={"X"} onClick={deleteTaskHandler}/>
                        </li>
                    )
                })}
            </ul>)}

            <Button className={filter === "All" ? "active-filter" : ""}
                    title={"All"}
                    onClick={() => filteredTasksHandler("All")}/>
            <Button
                className={filter === "Active" ? "active-filter" : ""}
                title={"Active"}
                onClick={() => filteredTasksHandler("Active")}/>
            <Button
                className={filter === "Completed" ? "active-filter" : ""}
                title={"Completed"}
                onClick={() => filteredTasksHandler("Completed")}/>
        </div>
    )
}