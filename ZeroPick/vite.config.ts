import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
    // proxy 설정도 이 안에 한 번만 선언합니다.
    proxy: {
      '/api': {
        target: 'https://zeropick.p-e.kr',
        changeOrigin: true,
        secure: false,

   resolve: {
      alias: { find: '@', replacement: resolve(__dirname, 'src') },
   },
   plugins: [react(), tsconfigPaths()],
   /* server: {
      port: 5174,
      https: {
         key: fs.readFileSync('./cert/localhost+1-key.pem'),
         cert: fs.readFileSync('./cert/localhost+1.pem'),
      },
    },
  },
});
