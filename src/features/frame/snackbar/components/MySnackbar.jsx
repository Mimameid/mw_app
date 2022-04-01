/* eslint-disable react/no-did-update-set-state */

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { STATUS_CODE } from 'common/constants';

import { Snackbar, Slide } from '@mui/material';
import { Alert } from '@mui/material';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function getStatusName(type) {
  let statusName;
  switch (type) {
    case STATUS_CODE.ERROR:
      statusName = 'error';
      break;
    case STATUS_CODE.WARNING:
      statusName = 'warning';
      break;
    case STATUS_CODE.SUCCESS:
      statusName = 'success';
      break;
    case STATUS_CODE.INFO:
      statusName = 'info';
      break;
    default:
      statusName = '';
  }
  return { statusName };
}

function createSnackInfo(message, type) {
  const { statusName } = getStatusName(type);
  return { statusName, message };
}

function MySnackBar() {
  const { type, message, count } = useSelector((state) => ({
    type: state.frame.snackbar.statusCode,
    message: state.frame.snackbar.statusMessage,
    count: state.frame.snackbar.count,
  }));

  let countRef = useRef(count);
  let newSnackRef = useRef([]);
  let timerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [currentSnack, setCurrentSnack] = useState(null);

  useEffect(() => {
    if (countRef.current !== count) {
      newSnackRef.current.push(createSnackInfo(message, type));
      if (newSnackRef.current.length > 1) {
        clearTimeout(timerRef.current);
        setOpen(false);
      }

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setOpen(false), 1800);
      setCurrentSnack(newSnackRef.current.shift());
      setOpen(true);
    }
  }, [count, message, type]);

  if (!currentSnack) {
    return null;
  }

  return (
    <Snackbar
      sx={{ width: 1, bottom: (theme) => ({ xs: theme.mixins.bottomNavigation.minHeight + 12, sm: 24 }) }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      TransitionComponent={TransitionUp}
      transitionDuration={{ enter: 200, exit: 200 }}
      disableWindowBlurListener
    >
      <Alert
        sx={{
          width: (theme) => ({
            xs: `calc(100% - 50px)`,
            sm: `calc(100% - 80px)`,
            md: `calc(100% - ${theme.mixins.cartDesktop.minWidth}px - 80px)`,
          }),
          mx: 2,
          borderRadius: 0.5,
        }}
        aria-describedby="status-snackbar"
        elevation={6}
        severity={currentSnack.statusName}
      >
        {currentSnack.message}
      </Alert>
    </Snackbar>
  );
}

export default MySnackBar;
