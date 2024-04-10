import index from '../index'
import { IPromotionList} from '@/vite/api'

export const getList = () => {
    return index({
        url: '/api/slotGameList',
        method: 'get',
        data: {}
    })
}

export const dataVersionApi = (): Promise<any> => {
    return index({
        url: '/webCache/GetDataVersionList',
        method: 'get',
        data: {}
    })
}

export const getPromotionListApi = (param: IPromotionList): Promise<any> => {
    return index({
        url: '/api/Utils/EventNews',
        method: 'post',
        data: param
    })
}