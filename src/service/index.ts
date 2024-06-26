import axios from 'axios';

const baseURL: string = import.meta.env.MODE === 'development' ? 'https://pwaapi.bacctest.com/' : 'https://pwaapi.bacc1688.com/'
const timeout: number = 90000;
const service = axios.create({
    baseURL: baseURL,
    timeout,
    headers: {
        'Content-Type': 'application/json',
    }
})
function errorHandle(status: any, message: any) {
    throw new Error(`status: ${status}, message: ${message}`);
}

service.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

service.interceptors.response.use((response) =>
    response.status === 200 ? Promise.resolve(response.data) : Promise.reject(response)
    , (error) => {
        const { response } = error
        if (response) {
            errorHandle(response.status, response.data.message)
            return Promise.reject(response)
        } else {
            console.log('请求失败')
        }
    }
)

export interface IRequest {
    url: string;
    method: string;
    data: any;
}
export  const request = ({ url, method, data }: IRequest) => {
    return service({
        url,
        method,
        data
    })
}



