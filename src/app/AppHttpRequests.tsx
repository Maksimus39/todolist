import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {EditableSpan} from "../common/components/EditableSpan";
import {AddItemForm} from "../common/components/AddItemForm";
import axios from "axios";



export type UpdateTitleResponse={
    data: {
        item: Todolist
    }
    fieldsErrors: FieldError
    messages: []
    resultCode: number
}
export type DeleteTaskResponse = {
    data: {
        item: Todolist
    }
    fieldsErrors: FieldError
    messages: []
    resultCode: number
}
export type UpdateTaskResponse = {
    data: {
        item: Todolist
    }
    fieldsErrors: FieldError
    messages: []
    resultCode: number
}
export type UpdateTaskModel = {
    status: number
    description: string
    title: string
    priority: number
    startDate: string
    deadline: string
}
export type CreateTaskResponse = {
    data: {
        item: DomainTask
    },
    messages: string[],
    fieldsErrors: FieldError[],
    resultCode: number
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}
export type DomainTask = {
    description: string
    title: string
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    status: number
}

// ------------------------------------------------------------
type UpdateTodolistResponse = {
    data: {
        item: Todolist
    }
    fieldsErrors: FieldError
    messages: []
    resultCode: number
}
type DeleteTodolistResponse = {
    data: {
        item: Todolist
    }
    fieldsErrors: FieldError
    messages: []
    resultCode: number
}
type FieldError = {
    error: string
    field: string
}
type CreateTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: Todolist
    }
}
export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            withCredentials: true,
            headers: {
                Authorization: "Bearer fec7c579-2aa1-455b-8c12-f99c909dfd4b"
            }
        }).then(res => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach(tl => {
                axios
                    .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                        withCredentials: true,
                        headers: {
                            Authorization: "Bearer fec7c579-2aa1-455b-8c12-f99c909dfd4b",
                            'API-KEY': 'd43edfa0-1a99-4664-a0fb-c06e44250603',
                        },
                    })
                    .then(res => {
                        // setTasks({...tasks, [tl.id]: res.data.items})
                        setTasks(prevTasks => ({...prevTasks, [tl.id]: res.data.items}))
                    })
            })
        })
    }, [])


    const createTodolistHandler = (title: string) => {
        axios.post<CreateTodolistResponse>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, {
            withCredentials: true,
            headers: {
                Authorization: 'Bearer fec7c579-2aa1-455b-8c12-f99c909dfd4b',
                'API-KEY': 'd43edfa0-1a99-4664-a0fb-c06e44250603',
            },
        }).then(res => {
            const newTodolist = res.data.data.item
            setTodolists([newTodolist, ...todolists])
        })

    }
    const removeTodolistHandler = (id: string) => {
        axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: 'Bearer fec7c579-2aa1-455b-8c12-f99c909dfd4b',
                'API-KEY': 'd43edfa0-1a99-4664-a0fb-c06e44250603',
            }
        }).then(res => {
            console.log(res.data)
            setTodolists(res => res.filter(el => el.id !== id))
        })
    }
    const updateTodolistHandler = (id: string, title: string) => {
        axios.put<UpdateTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, {
            withCredentials: true,
            headers: {
                Authorization: 'Bearer fec7c579-2aa1-455b-8c12-f99c909dfd4b',
                'API-KEY': 'd43edfa0-1a99-4664-a0fb-c06e44250603',
            }
        }).then(res => {
            console.log(res.data)
            setTodolists(res => res.map(el => el.id === id ? {...el, title: title} : el))
        })
    }
    const createTaskHandler = (title: string, todolistId: string) => {
        axios.post<CreateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title}, {
            withCredentials: true,
            headers: {
                Authorization: 'Bearer fec7c579-2aa1-455b-8c12-f99c909dfd4b',
                'API-KEY': 'd43edfa0-1a99-4664-a0fb-c06e44250603',
            }
        }).then(res => {
            const newTask = res.data.data.item
            setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        })
    }
    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios.delete<DeleteTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
            withCredentials: true,
            headers: {
                Authorization: 'Bearer fec7c579-2aa1-455b-8c12-f99c909dfd4b',
                'API-KEY': 'd43edfa0-1a99-4664-a0fb-c06e44250603',
            }
        }).then(res => {
            console.log(res.data)
            setTasks({
                ...tasks,
                [todolistId]: tasks[todolistId].filter(ts => ts.id !== taskId)
            })
        })
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        let status = e.currentTarget.checked ? 2 : 0

        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        axios.put<UpdateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model, {
            withCredentials: true,
            headers: {
                Authorization: 'Bearer fec7c579-2aa1-455b-8c12-f99c909dfd4b',
                'API-KEY': 'd43edfa0-1a99-4664-a0fb-c06e44250603',
            }
        }).then(res => {
            console.log(res.data)
            const newTasks = tasks[task.todoListId].map(t => (t.id === task.id ? {...t, ...model} : t))
            setTasks({...tasks, [task.todoListId]: newTasks})
        })
    }
    const changeTaskTitleHandler = (title: string, task: DomainTask) => {
        const model: UpdateTaskModel = {
            title,
            status:task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        axios.put<UpdateTitleResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,model,{
            withCredentials: true,
            headers: {
                Authorization: 'Bearer fec7c579-2aa1-455b-8c12-f99c909dfd4b',
                'API-KEY': 'd43edfa0-1a99-4664-a0fb-c06e44250603',
            }
        }).then(res => {
            console.log(res.data)
            const newTasks = tasks[task.todoListId].map(t => (t.id === task.id ? {...t, ...model} : t))
            setTasks({...tasks, [task.todoListId]: newTasks})
        })
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl: any) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}