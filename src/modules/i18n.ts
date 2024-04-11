import { createI18n } from 'vue-i18n'
import tw from '@/locales/tw.json'
import en from '@/locales/en.json'

type MessageSchema = typeof tw | typeof en


const i18n = createI18n<[MessageSchema], 'en-us' | 'zh-tw'>({
    locale: localStorage.getItem('locale') || 'zh-tw',
    legacy: false,
    messages: {
        'zh-tw': tw,
        "en-us": en
    }
})

export default i18n

