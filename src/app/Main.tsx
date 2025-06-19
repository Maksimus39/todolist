import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { useCreateTodolistMutation } from '@/features/todolists/api/todolistsApi.ts';
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists.tsx';

export const Main = () => {
  const [createTodolist] = useCreateTodolistMutation();

  return (
    <Container maxWidth={'lg'}>
      <Grid container sx={{ mb: '30px' }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  );
};
