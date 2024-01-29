import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormPropsType = {
    addItem: (title: string) => void

}


export function AddItemForm(props: AddItemFormPropsType) {

    // хук useState для добавления в input значений
    const [title, setTitle] = useState("")

    // function onChange
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    // function onKeyPressHandler
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }
    // хук для обработки ошибки
    const [error, setError] = useState<string | null>(null)
    // function addTask
    const addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }


    return <div>
        <input
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""}
        />
        <button onClick={addTaskHandler}>Add task</button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>
}