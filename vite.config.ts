// 描述：Vite 配置文件。
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as  path from 'path'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

const userConfig = defineConfig({
  plugins: [ //配置需要使用的插件列表
    vue(), //配置vue插件
    AutoImport({
      imports: [ //配置自動導入的模塊
        'vue',
        'vue-i18n',
      ],
      dts: 'src/vite/auto-imports.d.ts', //生成的dts文件名
      eslintrc: { //配置eslint規則
        enabled: true,
      },
    }),
    VueI18n({ //配置i18n插件
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, './src/locales/**')]
    })
  ],
  resolve: { //配置別名
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/views': path.resolve(__dirname, './src/views'),
      '@/locales': path.resolve(__dirname, './src/locales'),
      '@/components' : path.resolve(__dirname, './src/components'),
      '@/service' : path.resolve(__dirname, './src/service'),
    },
    extensions: [".js", ".json", ".ts", ".tsx", "jsx"]  // 導入時想要省略的擴展名列表
  },
  server: { //本地運行配置，以及反向代理配置
    host: 'localhost', //指定主機名
    port: 9527, //指定端口號
    strictPort: false, //設為true時端口被佔用則直接退出，不會嘗試下一個可用端口
    open: true, //服務啟動時自動在瀏覽器中打開應用
    proxy: {   // 反向代理配置
      '^/api': {
        target: 'http://localhost:3001/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  base: './', //指定打包路徑
  css: { // 配置 css modules 的行為
    preprocessorOptions: {
      sass: {
        additionalData: `
        @import "@/assets/normalize.scss";`,
      }
    }
  },
  build: {  //打包配置
    target: "modules", //瀏覽器兼容性
    outDir: "dist",  //指定輸出路徑
    assetsDir: "assets",  //指定靜態資源輸出路徑
    minify: "terser",  //壓縮混淆代碼
    terserOptions: { //terser配置
      format: {
        comments: false
      }

    },
    rollupOptions: {  //rollup配置
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      }
    }
  },
  define: { //配置全局變量
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
});

export default userConfig