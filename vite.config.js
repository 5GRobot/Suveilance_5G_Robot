import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "global": {},
  },
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost',
  },
  // resolve: {
  //   alias: {
  //     crypto: 'rollup-plugin-node-builtins',
  //     // http: require.resolve('rollup-plugin-node-builtins'),
  //     // path: require.resolve('rollup-plugin-node-builtins'),
  //     // fs: require.resolve('rollup-plugin-node-builtins'),
  //     // os: require.resolve('rollup-plugin-node-builtins'),
  //     // tslib: require.resolve('rollup-plugin-node-builtins'),
  //     // child_process: require.resolve('rollup-plugin-node-builtins'),
  //     // crypto: global.require.resolve('rollup-plugin-node-builtins'),
  //     // stream: require.resolve('rollup-plugin-node-builtins'),
  //     // https: require.resolve('rollup-plugin-node-builtins'),
  //     // http2: require.resolve('rollup-plugin-node-builtins'),
  //     // process: require.resolve('rollup-plugin-node-builtins'),
  //   },
  // },
})
