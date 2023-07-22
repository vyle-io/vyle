export interface VyleFile {
    id: string;
    name: string;
    originalName: string;
    size: number;
    type: string;
    url: string;
    createdAt: Date;
}
export interface Meta {
    total: number;
    perPage: number;
    page: number;
    totalPages: number;
    nextPage?: number;
    prevPage?: number;
    size: number;
}
export type Result = {
    metas: Meta;
    datas: Array<VyleFile>;
};
export interface Project {
    id: string;
    fileMetas: {
        total: number;
        perPage: number;
        totalPages: number;
        size: number;
    };
    createdAt: Date;
    updatedAt: Date;
    admin?: boolean;
}
export default class Vyle {
    private baseUrl;
    private client;
    private inited;
    project: Project;
    token: string;
    constructor(token: string);
    private fetcher;
    init(): Promise<Project>;
    remove(): Promise<any>;
    file: {
        list: ({ page, perPage, expiresIn, sortBy, }?: {
            page?: number;
            perPage?: number;
            expiresIn?: string | number;
            sortBy?: string;
        }) => Promise<Result>;
        remove: (fileId: string) => Promise<any>;
        add: (files: File[]) => Promise<any>;
    };
    static addProject(): Promise<Vyle>;
}
//# sourceMappingURL=index.d.ts.map