import {RequestClient} from './request-client/request-client';

const baseURL: string = import.meta.env.MODE === 'development' ? 'https://pwaapi.bacctest.com/' : 'https://pwaapi.bacc1688.com/'

const  createRequestClient =(baseURL: string) =>{
    const client = new RequestClient({
        baseURL,
    });
    client.requestInterceptor({
        fulfilled: (config) => {
            const token = localStorage.getItem('userToken') || '';
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
    });
    client.responseInterceptor({
        fulfilled: (response) => {
            const {data} = response;
            if (data.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/';
            }
            return response;
        },
    });
    return client;
}
export const requestClient = createRequestClient(baseURL);
