import axios from 'axios';

import { env } from '~shared/config';

export const api = axios.create({
  baseURL: env.API_HOST ?? '/api-proxy',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
