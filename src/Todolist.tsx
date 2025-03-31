import Button from "./Button.tsx";

type TasksType = {
    id: number,
    title: string
    isDone: boolean
}

type Props = {
    title: string
    tasks: TasksType[]
}
export const Todolist = ({title, tasks}: Props) => {
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
                        </li>
                    )
                })}
            </ul>)}

            <Button title={"All"}/>
            <Button title={"Active"}/>
            <Button title={"Completed"}/>
        </div>
    )
}