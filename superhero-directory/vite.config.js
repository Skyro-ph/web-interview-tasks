import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const ROOT_DIR = `${__dirname}/src/app`;
const BUILD_OUT_DIR = `${__dirname}/dist`;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  const isDev = mode === 'development';

  return {
    root: ROOT_DIR,
    envDir: __dirname,
    publicDir: `${__dirname}/public`,
    define: {
      global: {},
      __DEV__: isDev,
    },
    plugins: [react(), tailwindcss(), tsconfigPaths(), svgr()],
    build: {
      outDir: BUILD_OUT_DIR,
      emptyOutDir: true,
      sourcemap: isDev,
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api-proxy': {
          target: 'https://superheroapi.com',
          rewrite: (path) => path.replace(/^\/api-proxy/, ''),
          changeOrigin: true,
          cookieDomainRewrite: '',
          followRedirects: true,
        },
      },
    },
    preview: {
      port: 3000,
    },
  };
});
