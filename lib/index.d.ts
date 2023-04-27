import { AxiosRequestConfig } from "axios";
export default class Vyle {
    private token;
    private baseUrl;
    private client;
    constructor(token: string);
    fetcher(url: string, config?: AxiosRequestConfig): Promise<any>;
    list(data?: {
        [key: string]: any;
    }): Promise<any>;
    remove(file: string): Promise<any>;
    add(data: {
        files: File[];
    }): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map