import { AxiosRequestConfig } from "axios";
export interface Data {
    id: string;
    name: string;
    originalName: string;
    size: number;
    type: string;
    url: string;
    tempUrl: string;
    createdAt: Date;
}
export interface Meta {
    total: number;
    perPage: number;
    page: number;
    totalPages: number;
    nextPage?: number;
    prevPage?: number;
}
export type Result = {
    metas: Meta;
    datas: Array<Data>;
};
export default class Vyle {
    private token;
    private baseUrl;
    private client;
    constructor(token: string);
    fetcher(url: string, config?: AxiosRequestConfig): Promise<any>;
    list(data?: {
        [key: string]: any;
    }): Promise<Result>;
    remove(file: string): Promise<any>;
    add(data: {
        files: File[];
    }): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map