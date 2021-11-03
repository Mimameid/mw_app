import React from 'react';

import Dish from './Dish';
import { Box, Stack } from '@mui/material';

function Category({ category }) {
  return (
    <Stack spacing={2}>
      <Box sx={{ typography: 'h4', pb: 3 }}>{category.name}</Box>
      {category.dishes.map((dish, index) => (
        <Dish key={index} dish={dish} />
      ))}
    </Stack>
  );
}

export default Category;
