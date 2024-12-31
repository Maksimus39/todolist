import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const tasks1 = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 1, title: 'JS', isDone: true},
        {id: 1, title: 'React', isDone: true},
    ]

    const tasks2 = [
        {id: 1, title: 'Terminator', isDone: true},
        {id: 1, title: 'XXX', isDone: true},
        {id: 1, title: 'Robokop', isDone: true},
    ]


    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks1}/>
            <Todolist title={'What to buy'} tasks={tasks2}/>
        </div>
    );
}

export default App;
