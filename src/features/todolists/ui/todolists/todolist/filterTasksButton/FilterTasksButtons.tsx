import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import {FilterValuesType, TodolistType} from "../../../../../../app/App"
import {changeTodolistFilterAC} from "../../../../model/__tests__/todolists-reducer";
import {filterButtonsContainerSx} from "../../../../../../Task.style";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";


export type Props = {
    todolist: TodolistType
}

export const FilterTasksButtons = ({ todolist }: Props) => {

    const {id, filter} = todolist
    const dispatch = useAppDispatch()

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id,filter}))
    }
    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterTasksHandler('all')}
            >
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterTasksHandler('active')}
            >
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterTasksHandler('completed')}
            >
                Completed
            </Button>
        </Box>
    )
}