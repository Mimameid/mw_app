import React from 'react';

import { Dialog, DialogTitle, useMediaQuery, useTheme, Box, IconButton, DialogContent, Divider } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Close } from '@mui/icons-material';

function ResponsiveModal({ open, setOpen, title, variant, children }) {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Dialog
      sx={{ zIndex: variant === 'modal' ? (theme) => theme.zIndex.modal : null }}
      PaperProps={{
        component: PerfectScrollbar,
        sx: {
          overflow: 'hidden',
          maxWidth: '520px',
          width: '100%',
          mt: theme.spacing(8),
          mb: theme.spacing(8),

          bottomBorderWidth: '1px',

          zIndex: 1000,
        },
      }}
      onClose={() => setOpen(false)}
      open={open}
      scroll="paper"
      fullScreen={!match}
    >
      <DialogTitle sx={{ p: 6, pt: 3, pb: 2 }}>
        {typeof title === 'string' ? <Box sx={{ fontSize: 'h5.fontSize', textAlign: 'center' }}>{title}</Box> : title}

        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />
      <PerfectScrollbar>
        <DialogContent sx={{ p: 6, pt: 2 }}>{children}</DialogContent>
      </PerfectScrollbar>
    </Dialog>
  );
}

export default ResponsiveModal;
