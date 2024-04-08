import index from '../index'
import byjwtindex from '../byjwtindex'
interface ILoginParam {
    account: string,
    password: string,
    uidKey: string,
}
export interface IChangePwdParam {
    oldPassword: string,
    password: string,
    password_Check: string
}
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
