import type { AxiosInstance , AxiosResponse,
    InternalAxiosRequestConfig,} from 'axios';


interface RequestInterceptorConfig {
    fulfilled?:(config:InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    rejected?:(error:any) => any;
}
const defaultRequestInterceptorConfig:RequestInterceptorConfig = {
    fulfilled: (config) => config,
    rejected: (error) => Promise.reject(error),
};

interface ResponseInterceptorConfig <T=any>{
    fulfilled?:(value:AxiosResponse<T>) => AxiosResponse<T> | Promise<AxiosResponse<T>>;
    rejected?:(error:any) => any;
}

const defaultResponseInterceptorConfig: ResponseInterceptorConfig = {
    fulfilled: (response: AxiosResponse) => response,
    rejected: (error) => Promise.reject(error),
};

class Interceptor{
    private readonly instance: AxiosInstance;
    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    public requestUse(config:RequestInterceptorConfig = defaultRequestInterceptorConfig) {
        this.instance.interceptors.request.use(config.fulfilled, config.rejected);
    }

    public responseUse(config:ResponseInterceptorConfig = defaultResponseInterceptorConfig) {
        this.instance.interceptors.response.use(config.fulfilled, config.rejected);
    }
}

export { Interceptor }
