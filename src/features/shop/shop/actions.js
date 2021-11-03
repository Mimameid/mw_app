import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const fetchShop = createAsyncThunk('shop/data', async (id, thunkAPI) => {
  const fetchParams = createFetchParams(`shops/${id}`, 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Laden der Shopdaten', response.status);
  }
});

export const fetchLocationConditions = createAsyncThunk('shop/locationConditions', async ({ id, coords }, thunkAPI) => {
  try {
    const fetchParams = createFetchParams(`shops/${id}/locationConditions`, 'GET', undefined, coords);
    const response = await fetch(fetchParams.url.href, fetchParams.options);

    if (response.ok) {
      const data = await response.json();
      return Promise.resolve(data);
    } else {
      return createError('Fehler beim Laden der Ortungsdaten', response.status);
    }
  } catch (error) {
    console.log(error);
  }
});
