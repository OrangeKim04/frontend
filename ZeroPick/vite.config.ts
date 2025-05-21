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
    // mkcert 로 생성한 인증서를 직접 읽어 쓰는 모드
    https: {
      key: fs.readFileSync(resolve(__dirname, 'cert/localhost+2-key.pem')),
      cert: fs.readFileSync(resolve(__dirname, 'cert/localhost+2.pem')),
    },
    // 또는 간단하게 Vite가 자동으로 셀프-사인드 cert 를 만드는 모드:
    // https: true,

    // proxy 설정도 이 안에 한 번만 선언합니다.
    proxy: {
      '/api': {
        target: 'https://zeropick.p-e.kr',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
