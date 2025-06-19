import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { TodolistItem } from '@/features/todolists/ui/todolists/TodolistItem/TodolistItem.tsx';
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi.ts';

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery();

  return (
    <>
      {todolists?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: '0 20px 20px 20px' }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  );
};
