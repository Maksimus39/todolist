import Button from "./Button.tsx";
import {FilteredTasks} from "./App.tsx";

type TasksType = {
    id: number,
    title: string
    isDone: boolean
}

type Props = {
    title: string
    tasks: TasksType[]
    deleteTask: (taskId: number) => void
    filteredTasksHandler: (value: FilteredTasks) => void
}
export const Todolist = ({title, tasks, deleteTask, filteredTasksHandler}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (<ul>
                {tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox"
                                   checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button title={"X"} onClick={() => deleteTask(task.id)}/>
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