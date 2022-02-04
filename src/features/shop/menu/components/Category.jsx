import React from 'react';

import Dish from './Dish';
import { Box, Stack } from '@mui/material';

function Category({ category }) {
  return (
    <Stack spacing={2}>
      <Box sx={{ pb: 3 }}>
        <Box sx={{ typography: 'h4' }}>{category.name}</Box>
        <Box sx={{ color: 'text.secondary', fontSize: 'body2.fontSize' }}>{category.desc}</Box>
      </Box>
      {category.dishes.map((dish, index) => (
        <Dish key={index} dish={dish} />
      ))}
    </Stack>
  );
}

export default Category;
