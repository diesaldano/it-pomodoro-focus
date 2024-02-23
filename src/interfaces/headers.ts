export interface params {
    config: Config
}

export interface Config {
  headers: Headers;
  method?: string,
    url? : string,
}
export interface Headers {
  "Access-Control-Allow-Origin": string;
  "Access-Control-Allow-Methods": string;
  "Access-Control-Allow-Headers": string;
  "Content-Type"?: String;
  Authorization?: string;
}

export interface AxiosRequestConfig {
    method?: string,
    url?: string,
    headers: Headers
  };

export type methods = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'getUri';