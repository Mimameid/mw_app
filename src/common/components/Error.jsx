import React from 'react';
import Image from 'next/image';
import errorImage from 'public/page_not_found.svg';

import { Box } from '@mui/material';

function Error({ statusCode, message }) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Box
        sx={{
          width: '360px',
          px: 4,
          margin: 'auto',
        }}
      >
        <Image alt="error image" width={360} height={360} src={errorImage} />

        <Box
          sx={{
            typography: 'h4',
            textAlign: 'center',
            pb: 2,
          }}
        >
          Shop nicht gefunden
        </Box>
        <Box
          sx={{
            typography: 'subtitle2',
          }}
        >
          Der von Ihnen gesuchte Shop ist leider nicht verfügbar. Möglicherweise hast du den falschen Link erwischt oder
          der Shop ist bei uns noch nicht eingetragen.
        </Box>
      </Box>
    </Box>
  );
}

export default Error;
