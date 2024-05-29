import { request  } from '../index'
import { byJwtrequest } from '../byjwtindex'
import {ILoginParam,IChangePwdParam ,IMemberInfoParam  } from '@/vite/api'
import { AxiosResponse } from 'axios'

/**
 * 透過對指定URL進行POST請求來登錄會員的函數。
 * @param {ILoginParam} data - 與請求一起發送的數據。
 * @returns {Promise<any>} 解析為POST請求響應的Promise。
 */
export const loginApi = (data: ILoginParam):Promise<AxiosResponse<any>> => {
    return request({
        url: '/api/Member/Login',
        method: 'post',
        data
    })
}

/**
 * 透過對指定URL進行POST請求來登出會員的函數。
 * @returns {Promise<any>} 解析為POST請求響應的Promise。
 */
export const logoutApi = ():Promise<AxiosResponse<any>> => {
    return byJwtrequest({
        url: '/api/Member/Logout',
        method: 'post',
        data: {}
    })
}

/**
 * 透過對指定URL進行POST請求來更改會員密碼的函數。
 * @param {IChangePwdParam} data - 與請求一起發送的數據。
 * @returns {Promise<any>} 解析為POST請求響應的Promise。
 */
export const changePwdApi = (data:IChangePwdParam): Promise<AxiosResponse<any>> => {
    return byJwtrequest({
        url: '/api/Member/ChangePWD',
        method: 'post',
        data
    })
}

/**
 * 透過對指定URL進行POST請求來獲取會員信用點數
 *
 * @returns {Promise<any>} 解析為POST請求響應的Promise。
 */
export const getBalanceApi = (): Promise<AxiosResponse<any>> =>{
    return byJwtrequest({
        url: '/api/UnReturnAccount/ForceUpdateMoney',
        method: 'post',
        data: {}
    })
}


/**
 * 透過對指定URL進行POST請求來獲取會員信息的函數。
 *
 * @param {IMemberInfoParam} data - 與請求一起發送的數據。
 * @returns {Promise<any>} 解析為POST請求響應的Promise。
 */
export const getMemberInfoApi = (data:IMemberInfoParam): Promise<AxiosResponse<any>> => {
    return request({
        url: 'http://192.168.196.134:8000/api/Member/userInfo',
        method: 'post',
        data
    })
}

export const getUpdateMemberStatusApi = (param:any):Promise <AxiosResponse<any>> =>{
    return byJwtrequest({
        url: '/api/Member/UpdateMemberStatus',
        method: 'post',
        data: param
    })
}
