import type {
    AxiosInstance,
    AxiosRequestConfig,
    CreateAxiosDefaults,
} from 'axios'
import axios from 'axios';
import { Interceptor } from './modules/interceptor';

class RequestClient {
    private readonly instance: AxiosInstance;
    public requestInterceptor: Interceptor['requestUse'];
    public responseInterceptor: Interceptor['responseUse'];

    constructor() {
        const defaultConfig: CreateAxiosDefaults = {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 3000,
            withCredentials: false,
        };
        this.instance = axios.create(defaultConfig);
        const interceptorManager = new Interceptor(this.instance);
        this.requestInterceptor =
            interceptorManager.requestUse.bind(interceptorManager);
        this.responseInterceptor =
            interceptorManager.responseUse.bind(interceptorManager);
    }

    public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>(url, {...config, method: 'GET'});
    }
}
export{ RequestClient }
