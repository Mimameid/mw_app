import React from 'react';
import storeWrapper from 'store/store';
import { fetchShop } from 'features/shop/shop/actions';

import Frame from 'features/frame/frame/components/Frame';
import Shop from 'features/shop/shop/components/Shop';
import { CatchingPokemonSharp } from '@mui/icons-material';

export default function Page() {
  return (
    <Frame>
      <Shop />
    </Frame>
  );
}

// This gets called on every request
export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({ params }) => {
  let props = {};

  const response = await store.dispatch(fetchShop(params.slug[0]));
  if (response.error) {
    props.error = { statusCode: 404, message: response.error.message };
  }

  // Pass data to the page via props
  return { props };
});
