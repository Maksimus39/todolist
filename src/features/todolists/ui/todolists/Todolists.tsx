import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./todolist/Todolist";
import {useAppSelector} from "../../../../common/hooks/useAppSelectors";
import {todolistSelectors} from "../../model/todolistsSelectors";

export const Todolists = () => {
    const todolists = useAppSelector(todolistSelectors)

    return (
        <>
            {todolists.map(tl => {
                return (
                    <Grid key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist
                                key={tl.id}
                                todolist={tl}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}