import React from 'react';
import { Box } from '@mui/material';

function ShopContent({ children }) {
  return <Box sx={{ position: 'relative', pb: 12, bgcolor: 'common.white' }}>{children}</Box>;
}

export default ShopContent;
