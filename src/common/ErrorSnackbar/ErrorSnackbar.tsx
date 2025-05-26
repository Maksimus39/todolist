import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { selectAppError, setAppErrorAC } from '@/app/app-slice.ts';

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectAppError);
  const dispatch = useAppDispatch();

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC({ error: null }));
  };

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity="info" variant="filled" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
