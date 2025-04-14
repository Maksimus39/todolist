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
}
export const Todolist = ({
                             title,
                             tasks,
                             deleteTask,
                             filteredTasksHandler,
                             createTask
                         }: Props) => {

    const [taskTitle, setTaskTitle] = useState<string>('');

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }
    const onChangeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
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
                />
                <Button title={"+"}
                        onClick={createTaskHandler}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (<ul>
                {tasks.map(task => {

                    const deleteTaskHandler = () => {
                        deleteTask(task.id)
                    }

                    return (
                        <li key={task.id}>
                            <input type="checkbox"
                                   checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button title={"X"} onClick={deleteTaskHandler}/>
                        </li>
                    )
                })}
            </ul>)}

            <Button title={"All"}
                    onClick={() => filteredTasksHandler("All")}/>
            <Button title={"Active"}
                    onClick={() => filteredTasksHandler("Active")}/>
            <Button title={"Completed"}
                    onClick={() => filteredTasksHandler("Completed")}/>
        </div>
    )
}