import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchAuthorizationData = createAsyncThunk(
  'fetchAuthorizationData',
  async (token) => {
    const response = await axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
);

export default fetchAuthorizationData;
