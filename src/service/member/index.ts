import index from '../index'

interface ILoginParam {
    account: string,
    password: string,
    uikey: string,
}
export const loginApi = (param: ILoginParam):Promise<any> => {
    return index({
        url: '/api/Member/Login',
        method: 'post',
        data:param
    })
}

export const logoutApi = ():Promise<any> => {
    return index({
        url: '/api/Member/Logout',
        method: 'post',
    })
}