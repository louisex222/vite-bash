import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './modules/i18n';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import './assets/normalize.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import VueLazyLoad from 'vue3-lazyload'
import '@/assets/tailwind.css'
const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)
app.use(ElementPlus)
app.use(VueLazyLoad,{
    loading: '',
    error: '',
})
app.mount('#app')
