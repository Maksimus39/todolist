import {TodolistType} from "../../../../../../app/App";
import {List} from "@mui/material";
import {Task} from "../../../../../../Task";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelectors";
import {selectTasksSelectors} from "../../../../model/tasksSelectors";

type Props = {
    todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
    const tasks = useAppSelector(selectTasksSelectors)

    const allTodolistTasks = tasks[todolist.id]

    let tasksForTodolist = allTodolistTasks

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {tasksForTodolist.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasksForTodolist.map(task => {
                        return <Task task={task} todolist={todolist} />
                    })}
                </List>
            )}
        </>
    )
}