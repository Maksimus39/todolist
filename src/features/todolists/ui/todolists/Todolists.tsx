import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/features/todolists/model/selectors/todolist-selector.ts";
import Grid from "@mui/material/Grid2";
import {Paper} from "@mui/material";
import {TodolistItem} from "@/features/todolists/ui/todolists/TodolistItem/TodolistItem.tsx";

export const Todolists = () => {
    // useSelector
    const todolists = useAppSelector(selectTodolists)

    return (
        <div>
            {
                todolists.map(todolist => (
                        <Grid key={todolist.id}>
                            <Paper sx={{p: '0 20px 20px 20px'}}>
                                <TodolistItem todolist={todolist}/>
                            </Paper>
                        </Grid>
                    )
                )
            }
        </div>
    )
}