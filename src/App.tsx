import {TaskType, Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TasksStateType = {
    [key: string]: TaskType[]
}
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const App = () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const removeTask = (taskId: string, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId),
        }
        setTasks(newTodolistTasks)
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId ? {...tl, filter} : tl
        })
        setTodolists(newTodolists)
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(tl=>tl.id===taskId?{...tl,isDone: taskStatus}:tl)})
    }

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)

        // удалим таски для тудулиста из стейта где мы храним таски
        delete tasks[todolistId]
        // засетаем в state копию объекта
        setTasks({ ...tasks })
    }

    const addTodolist = (title: string) => {
        const todolistId=v1()
        const newTodolist: TodolistType = { id: todolistId, title: title, filter: 'all' }
        setTodolists([newTodolist, ...todolists])
        setTasks({ ...tasks, [todolistId]: [] })
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t)),
        }
        setTasks(newTodolistTasks)
    }

    const updateTodolist = (todolistId: string, title: string) => {
        const newTodolists = todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl))
        setTodolists(newTodolists)
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todolists.map(tl => {

                const allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks

                if (tl.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                }

                if (tl.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                }

                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolist={updateTodolist}
                    />
                )
            })}
        </div>
    )
}