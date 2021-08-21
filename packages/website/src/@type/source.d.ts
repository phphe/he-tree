declare const React: string;
declare module '*.json';
declare module '*.png';
declare module '*.jpg';
declare module 'element-plus/lib/index.esm';

declare namespace NodeJS {
  // eslint-disable-next-line
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
  }
  // eslint-disable-next-line
  interface Process {
    env: ProcessEnv;
  }
}

interface Window {
  __INITIAL_STATE__: any;
}
