import {request} from '../index'
import {AxiosResponse} from 'axios'
import {byJwtrequest} from "@/service/byjwtindex";
/**
 * 透過對指定URL進行GET請求來執行健康檢查的函數。
 *
 * @returns {Promise<any>} 解析為GET請求響應的Promise。
 */
export const getHealthCheck = ():Promise<AxiosResponse<any>> =>{
    return request({
        url: 'http://localhost:3000/api/Game/HealthCheck',
        method: 'get',
        data: {}
    })
}
interface IRequest {
    url: string;
    method: string;
    data: any;
    headers?: {
        [key: string]: string;
    };
}
export const getAllGameCheckApi = (param:any):Promise<AxiosResponse<IRequest>> => {
    return request({
        url: 'http://192.168.196.134:8000/api/Game/GetGameToken',
        method: 'post',
        data: param,
    })
}


export const getClubStartFlagApi = ():Promise<AxiosResponse<any>> => {
    return byJwtrequest({
        url: '/api/Game/GameClubStartFlagStatus',
        method: 'post',
        data: {}
    })
}
