import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/public/store/' : '/',
  plugins: [
    react({
      fastRefresh: true,
    }),
    svgr({
      svgrOptions: {
        svgo: false,
        titleProp: true,
        ref: true,
      },
    }),
  ],

  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.mjs', '.js', '.jsx', '.json'],
  },

  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    postcss: {
      plugins: [
        require('autoprefixer')({
          flexbox: 'no-2009',
        }),
      ],
    },
  },

  build: {
    outDir: 'build',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          bootstrap: ['react-bootstrap', 'bootstrap'],
        },
        entryFileNames: 'static/js/[name].[hash].js',
        chunkFileNames: 'static/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'static/css/[name].[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return 'static/media/[name].[hash][extname]';
          }
          return 'static/media/[name].[hash][extname]';
        },
      },
    },
    minify: 'esbuild',
    assetsInlineLimit: 10000,
    target: 'es2015',
  },

  envPrefix: 'VITE_',

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-bootstrap'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
}));
