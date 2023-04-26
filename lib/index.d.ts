export default class Vyle {
    private token;
    private baseUrl;
    private client;
    constructor(token: string);
    fetcher(url: string, params?: any): Promise<any>;
    list(body?: {
        [key: string]: any;
    }): Promise<any>;
    remove(file: string): Promise<any>;
    add(body: {
        files: File[];
    }): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map