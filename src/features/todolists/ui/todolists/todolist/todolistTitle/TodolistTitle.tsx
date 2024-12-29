import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistType} from "../../../../../../app/App";
import {useDispatch} from "react-redux";
import {changeTodolistTitleAC, removeTodolistAC} from "../../../../model/__tests__/todolists-reducer";
import {EditableSpan} from "../../../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";

type Props = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: Props) => {
    const {title, id} = todolist

    const dispatch = useDispatch()

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }
    const updateTodolistHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return (
        <div className={'container'}>
            <h3>
                <EditableSpan value={title} onChange={updateTodolistHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

        </div>
    )
}