import { devEnv, prodEnv, testEnv } from './env/index';

const { WAYFARER_NODE_ENV } = process.env;

export const config = WAYFARER_NODE_ENV === 'development' ? devEnv
  : WAYFARER_NODE_ENV === 'production' ? prodEnv
    : testEnv;
