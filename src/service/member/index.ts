import index from '../index'
import byjwtindex from '../byjwtindex'
import {ILoginParam,IChangePwdParam } from '@/vite/api'

export const loginApi = (data: ILoginParam):Promise<any> => {
    return index({
        url: '/api/Member/Login',
        method: 'post',
        data
    })
}

export const logoutApi = ():Promise<any> => {
    return byjwtindex({
        url: '/api/Member/Logout',
        method: 'post',
        data: {}
    })
}


export const changePwdApi = (data:IChangePwdParam): Promise<any> => {
    return byjwtindex({
        url: '/api/Member/ChangePWD',
        method: 'post',
        data
    })
}

export const getBalanceApi = (): Promise<any>=>{
    return byjwtindex({
        url: '/api/UnReturnAccount/ForceUpdateMoney',
        method: 'post',
        data: {}
    })
}


export const getMemberInfoApi = (data:any): Promise<any> => {
    return index({
        url: 'http://10.20.37.26:8000/api/Member/userInfo',
        method: 'post',
        data
    })
}