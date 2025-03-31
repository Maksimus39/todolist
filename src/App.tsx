import './App.css'
import {Todolist} from "./Todolist.tsx";

export const App = () => {
    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]

    const tasks2 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]


    return (
        <div className="app">
            <Todolist title={"What to learn"} tasks={tasks1}/>
            <Todolist title={"What to buy"} tasks={tasks2}/>
        </div>
    )
}


export default App

