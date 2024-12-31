import { byJwtrequest } from '../byjwtindex'
import  {AxiosResponse} from 'axios'
import { IUserOrderParam ,IBankTransfersParam } from '../../vite/api';
import {requestClient} from '../request'

interface  IGamePaymentResult {
    desc: string,
    errorDetail: string | null,
    code:number,
    result: {
        code:string,
        paymentTypes: [
            {
                name: string,
                amountList: string,
                minAmount: number,
                maxAmount: number
            },
        ]
        errorMessage: string | null,
    }
    status: number
}
/**
 * 取得付款方式
 * @param {Object} param 所需參數
 */
export const getPaymentApi = ():Promise<AxiosResponse<IGamePaymentResult>> =>{
    return byJwtrequest({
        url: '/api/H1Payment/paymenttypes',
        method: 'get',
        data: {}
    })
}



interface IUserOrderResult {
    status:  number,
    desc: string,
    result: {
        paymentUrl: string,
        code: number,
        errorMessage: string | null,
    },
    errorDetail: string | null,
}
/**
 *  銀行掃碼付款
 * @param {Object} param 所需參數
 */
export const useOrdersApi = (data:IUserOrderParam):Promise<AxiosResponse<IUserOrderResult>> =>{
    return byJwtrequest({
        url: '/api/H1Payment/orders',
        method: 'post',
        data
    })
}
interface IBankTransfersResult {
    status: number,
    desc: string,
    result: {
        "bankCode": string,
        "bankShortName": string,
        "bankAccount": string,
        "accountName": string,
        "tradeNo": string,
        "amount":  number,
        "code": number,
        "errorMessage": string | null,
    },
    errorDetail: string | null,
}

export const bankTransfersApi = (data:IBankTransfersParam):Promise<AxiosResponse<IBankTransfersResult>> =>{
    return byJwtrequest({
        url: '/api/H1Payment/transfers',
        method: 'post',
        data
    })
}

export const testPaymentApi = ()=>{
    return requestClient.get<IGamePaymentResult>('/api/H1Payment/paymenttypes')
}

