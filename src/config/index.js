import { devEnv, testEnv, prodEnv } from './env/index';

const { WAYFARER_NODE_ENV } = process.env;

const config = WAYFARER_NODE_ENV === 'development' ? devEnv
  : WAYFARER_NODE_ENV === 'production' ? prodEnv
    : testEnv;

export default config;
