import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  resolve: {
    alias: { find: '@', replacement: resolve(__dirname, 'src') },
  },
  plugins: [react(), tsconfigPaths()],
  server: {
    host: 'localhost',
    port: 5174,
    https: {
      key: fs.readFileSync(resolve(__dirname, 'cert/localhost+2-key.pem')),
      cert: fs.readFileSync(resolve(__dirname, 'cert/localhost+2.pem')),
    },
    proxy: {
      '/api': {
        target: 'https://zeropick.p-e.kr',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});