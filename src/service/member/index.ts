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
