import React from 'react';

import { Box, DialogTitle, Divider, Drawer, IconButton, Paper } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Close } from '@mui/icons-material';

function ResponsiveDrawer({ open, setOpen, title, variant, children, ...props }) {
  return (
    <Drawer
      sx={{ zIndex: variant === 'modal' ? (theme) => theme.zIndex.modal : null }}
      anchor="bottom"
      open={open}
      onClose={() => setOpen(false)}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          height: (theme) => theme.mixins.swipeableDrawer.height,
          borderRadius: (theme) => theme.mixins.swipeableDrawer.borderRadius,
        },
      }}
      {...props}
    >
      <DialogTitle>
        {typeof title === 'string' ? <Box sx={{ typography: 'swiperTitle', textAlign: 'center' }}>{title}</Box> : title}

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
      {variant && variant === 'modal' ? (
        <PerfectScrollbar>
          <Box sx={{ px: 2, py: 3 }}>{children}</Box>
        </PerfectScrollbar>
      ) : (
        <React.Fragment>
          <Box sx={{ px: 2, py: 1 }}>{children}</Box>
          <Box sx={{ mt: 'auto' }} />
          <Divider />
          <Box sx={{ mb: (theme) => `${theme.mixins.bottomNavigation.minHeight}px` }} />
        </React.Fragment>
      )}
    </Drawer>
  );
}

export default ResponsiveDrawer;
