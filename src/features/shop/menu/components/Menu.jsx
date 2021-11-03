import React from 'react';

import { Container, Divider, Stack, Toolbar } from '@mui/material';
import Category from './Category';

function Menu({ menu }) {
  return menu ? (
    <Container maxWidth="md">
      <Stack sx={{ pt: 7 }} spacing={6} divider={<Divider variant="middle" />}>
        {menu.categories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </Stack>
    </Container>
  ) : null;
}

export default Menu;
