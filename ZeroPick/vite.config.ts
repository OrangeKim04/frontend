import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
/* import fs from 'fs'; */

export default defineConfig({
   plugins: [react(), tsconfigPaths()],
   resolve: {
      alias: {
         '@': resolve(__dirname, 'src'),
      },
   },

   /* server: {
      port: 5174,
      proxy: {
         '/api': {
            target: 'https://zeropick.p-e.kr',
            changeOrigin: true,
            secure: false,
         },
      },
      // 필요 시 HTTPS 설정 활성화

      https: {
         key: fs.readFileSync('./cert/localhost-key.pem'),
         cert: fs.readFileSync('./cert/localhost.pem'),
      },
   }, */
});
