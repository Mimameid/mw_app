import React from 'react';

import Product from './Product';
import { Box, Stack } from '@mui/material';

function Category({ category }) {
  return (
    <Stack spacing={2}>
      <Box sx={{ pb: 3 }}>
        <Box sx={{ typography: 'h4' }}>{category.name}</Box>
        <Box sx={{ color: 'text.secondary', fontSize: 'body2.fontSize' }}>{category.desc}</Box>
      </Box>
      {category.products.map((product, index) => (
        <Product key={index} product={product} />
      ))}
    </Stack>
  );
}

export default Category;
