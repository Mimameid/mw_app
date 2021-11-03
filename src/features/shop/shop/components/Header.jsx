import React from 'react';
import Image from 'next/image';

import { Box, Typography } from '@mui/material';

function Header({ shop }) {
  return (
    <Box sx={{ position: 'relative', minHeight: 360, bgcolor: 'action.disabled' }}>
      <Box sx={{ position: 'relative', px: { xs: 1, sm: 5 }, pt: 14, color: 'common.white', zIndex: 1000 }}>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Titan One', cursive",
              lineHeight: { xs: '44px', sm: '62px' },
              fontSize: { xs: 44, sm: 60 },
              alignSelf: 'flex-end',
            }}
          >
            {shop.name}
          </Typography>
        </Box>
        <Box
          sx={{
            pt: { xs: 0, sm: 1 },
            fontSize: { xs: 15, sm: 16 },
            fontWeight: 500,
          }}
        >
          {shop.desc}
        </Box>
      </Box>
      <Box>
        <Image src="/doener_generic_1.jpg" alt="Mountains" layout="fill" objectFit="cover" />
      </Box>
    </Box>
  );
}

export default Header;
