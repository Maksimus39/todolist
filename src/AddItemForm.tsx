import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";


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
        <TextField
            value={title}
            variant={"outlined"}
            label={"Type value"}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            helperText={error}
        />
        <IconButton onClick={addTaskHandler}  color={"primary"}>
            <ControlPoint/>
        </IconButton>
    </div>
}