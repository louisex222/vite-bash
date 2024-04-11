import index from '../index'
import byjwtindex from '../byjwtindex'
import { IPromotionList} from '@/vite/api'

export const getSlotGameApi = (param: string) => {
    return index({
        url: `/webCache/GetSlotGame${param}List`,
        method: 'get',
        data: param
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
export const getClubListApi = (): Promise<any> => {
    return index({
        url: '/webCache/GetClubList2',
        method: 'get',
        data: {}
    })
}

export const enterSlotGameApi = (game:string,param: any): Promise<any> => {
    return byjwtindex({
        url: `/api/Game/GetGameToken/${game}`,
        method: 'post',
        data: param
    })
}
