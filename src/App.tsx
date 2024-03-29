import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

// типизация для массива тудулистов
export type TodolistType = {
    id: string
    title: string
    filter: ButtonType
}

// типизация для Button кнопок
export type ButtonType = "all" | "active" | "completed"

// типизация для массива тасок
type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    // функция удаления tasks
    function removeTask(idTask: string, todolistID: string) {
        setTasksObj({...tasksObj, [todolistID]: tasksObj[todolistID].filter(t => t.id != idTask)})
    }

    // функция изменения title todolist
    function changeTodolistTitle(todolistID: string, newTitle: string) {
        setTodolist(todolists.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl))
    }

    // функция по фильтрации по кнопкам
    function changeFilter(value: ButtonType, todolistID: string) {
        setTodolist(todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }

    // функция добавляющая таску addTask
    function addTask(title: string, todolistID: string) {
        // новая таска
        let task = {id: v1(), title: title, isDone: false}
        setTasksObj({...tasksObj, [todolistID]: [task, ...tasksObj[todolistID]]})
    }

    // функция для изменения чекбокса
    function changeTaskStatus(id: string, isDone: boolean, todolistID: string) {
        setTasksObj({
            ...tasksObj,
            [todolistID]: tasksObj[todolistID].map(ts => ts.id === id ? {...ts, isDone: isDone} : ts)
        })
    }

    function changeTaskTitle(id: string, newTitle: string, todolistID: string) {
        setTasksObj({
            ...tasksObj,
            [todolistID]: tasksObj[todolistID].map(ts => ts.id === id ? {...ts, title: newTitle} : ts)
        })
    }

    // функция удаления todolist
    function removeTodolists(todolistID: string) {
        setTodolist(todolists.filter(tl => tl.id !== todolistID))
        delete tasksObj[todolistID]
        setTasksObj({...tasksObj})
    }

    // ключи для массивов
    let todolistID1 = v1()
    let todolistID2 = v1()

    // state для todolist
    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodolist([...todolists, todolist])
        setTasksObj({...tasksObj, [todolist.id]: []})
    }

    // state для tasks
    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false}
        ]
    })



    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-lebel="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {

                        // блок кода filter
                        let filteredTasks = tasksObj[tl.id]  // это все таски "all"

                        if (tl.filter === "active") {
                            filteredTasks = tasksObj[tl.id].filter(fl => !fl.isDone)
                        }

                        if (tl.filter === "completed") {
                            filteredTasks = tasksObj[tl.id].filter(fl => fl.isDone)
                        }

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={filteredTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={tl.filter}
                                    removeTodolists={removeTodolists}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}


export default App;
