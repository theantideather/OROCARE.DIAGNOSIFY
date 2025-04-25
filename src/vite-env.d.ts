/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string
  readonly VITE_HELIUS_RPC_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'crypto-browserify';
declare module 'stream-browserify';
declare module 'assert';
declare module 'stream-http';
declare module 'https-browserify';
declare module 'os-browserify';
declare module 'url';