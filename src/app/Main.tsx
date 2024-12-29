import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {AddItemForm} from "../common/components/AddItemForm";
import {addTodolistAC} from "../features/todolists/model/__tests__/todolists-reducer";
import {Todolists} from "../features/todolists/ui/todolists/Todolists";
import {useAppDispatch} from "../common/hooks/useAppDispatch";

export const Main = () => {
    const dispatch = useAppDispatch()

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    return <Container fixed>
        <Grid container sx={{mb: '30px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>

        <Grid container spacing={4}>
           <Todolists/>
        </Grid>
    </Container>
}