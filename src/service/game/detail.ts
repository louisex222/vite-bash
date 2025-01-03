import {request} from '../index'
import {byJwtrequest} from '../byjwtindex'
import { ITableListParam, IServerIdParam} from '@/vite/api'
import {AxiosResponse} from "axios";

/**
 * 透過對指定URL進行GET請求，獲取遊戲列表。
 * @param {ISlotGameParam} param - 與請求一起發送的數據。
 * @returns {Promise<any>} 解析為GET請求響應的Promise。
 */
export const getSlotGameApi = (param: string) :Promise<AxiosResponse<any>> => {
    return request({
        url: `/webCache/GetSlotGame${param}List`,
        method: 'get',
        data: param
    })
}
/**
 * 透過對指定URL進行GET請求，獲取卡片遊戲列表。
 * @param {ITableGameParam} param - 與請求一起發送的數據。
 * @returns {Promise<any>} 解析為GET請求響應的Promise。
 */
export const getCardGameApi = (param: string) :Promise<AxiosResponse<any>> => {
    return request({
        url: `/webCache/GetTableGame${param}List`,
        method: 'get',
        data: param
    })
}
/**
 * 透過對指定URL進行GET請求，獲取數據版本。
 * @returns {Promise<any>} 解析為GET請求響應的Promise。
 */
export const dataVersionApi = (): Promise<AxiosResponse<any>> => {
    return request({
        url: '/webCache/GetDataVersionList',
        method: 'get',
        data: {}
    })
}

/**
 * 透過對指定URL進行GET請求，獲取俱樂部列表。
 * @returns {Promise<any>} 解析為GET請求響應的Promise。
 */
export const getClubListApi = (): Promise<AxiosResponse<any>> => {
    return request({
        url: '/webCache/GetClubList2',
        method: 'get',
        data: {}
    })
}
/**
 * 透過對指定URL進行POST請求，進入遊戲。
 * @param {string} game - 遊戲名稱。
 * @param {any} param - 與請求一起發送的數據。
 * @returns {Promise<any>} 解析為POST請求響應的Promise。
 */
export const enterGameApi = (game:string,param: any): Promise<AxiosResponse<any>> => {
    return byJwtrequest({
        url: `/api/Game/GetGameToken/${game}`,
        method: 'post',
        data: param
    })
}

/**
 * 透過對指定URL進行POST請求，獲取桌遊列表。
 * @param {ITableGameParam} param - 與請求一起發送的數據。
 * @returns {Promise<any>} 解析為POST請求響應的Promise。
 */
export const getGameTablesApi = (param: ITableListParam): Promise<AxiosResponse<any>> => {
    return request({
        url: '/webCache/GetAllTableList',
        method: 'post',
        data: param
    })
}

/**
 * 透過對指定URL進行GET請求，獲取遊戲 ServerId。
 * @param {IServerIdParam} param - 與請求一起發送的數據。
 * @returns {Promise<any>} 解析為GET請求響應的Promise。
 */
export const getServerIdApi = (param:IServerIdParam): Promise<AxiosResponse<any>> => {
    return request({
        url: `http://192.168.196.134:8000/api/game/ServerId`,
        method: 'post',
        data: param
    })
}

export  const getGameRecordApi = (param:any) : Promise<AxiosResponse<any>> =>{
    return byJwtrequest({
        url: 'https://pwaapi.royal-test.com/api/Report/GameRecord2',
        method: 'post',
        data: param
    })
}

export const getTimeRangeApi = ():Promise<AxiosResponse<any>> => {
    return byJwtrequest({
        url: '/api/Utils/TimeRange',
        method: 'post',
        data: {}
    })
}

export const getReportStatusCheckApi = ():Promise<AxiosResponse<any>> => {
    return request({
        url: 'http://192.168.196.134:8000/api/Game/ReportStatusCheck',
        method: 'get',
        data: {}
    })
}

export const getHistoryApi = (param:any):Promise<AxiosResponse<any>> => {
    return byJwtrequest({
        url: '/api/Report/GameRecord2',
        method: 'post',
        data: param
    })
}


export const getHotGameListApi = (param: any):Promise<AxiosResponse<any>> =>{
    return request({
        url: '/api/Game/MobilePopularGames',
        method: 'post',
        data: param
    })
}
