import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import fs from 'fs';
// https://vite.dev/config/

export default defineConfig({
   resolve: {
      alias: { find: '@', replacement: resolve(__dirname, 'src') },
   },
   plugins: [react(), tsconfigPaths()],
   server: {
      https: {
         key: fs.readFileSync('./cert/localhost+1-key.pem'),
         cert: fs.readFileSync('./cert/localhost+1.pem'),
      },
   },
});
