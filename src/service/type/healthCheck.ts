import {request} from '../index'
import {AxiosResponse} from 'axios'
/**
 * 透過對指定URL進行GET請求來執行健康檢查的函數。
 *
 * @returns {Promise<any>} 解析為GET請求響應的Promise。
 */
export const getHealthCheck = ():Promise<AxiosResponse<any>> =>{
    return request({
        url: 'http://10.20.37.26:8000/api/Game/HealthCheck',
        method: 'get',
        data: {}
    })
}

