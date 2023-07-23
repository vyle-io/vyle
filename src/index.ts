import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

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

const BASE_URL = "http://34.71.110.209:44800";
const LOCAL_BASE_URL = "http://localhost:44800";

export default class Vyle {
  private baseUrl = BASE_URL;
  private client: AxiosInstance;
  private inited = false;

  project!: Project;
  token!: string;

  constructor(token: string) {
    this.token = token;
    this.client = Axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    });
  }

  private async fetcher(url: string, config: AxiosRequestConfig = {}) {
    if (!this.inited) throw "Vyle not initialized";

    try {
      const results = await this.client.request({ url, ...config });
      return results.data;
    } catch (error) {
      throw error;
    }
  }

  async init() {
    this.inited = true;

    const result = await this.fetcher("project/current");
    if (!result) {
      this.inited = false;
      throw "project_not_found";
    }

    this.project = result;
    return this.project;
  }

  async remove() {
    return await this.fetcher("project/remove", { method: "POST" });
  }

  file = {
    list: async ({
      page,
      perPage,
      expiresIn,
      sortBy,
    }: {
      page?: number;
      perPage?: number;
      expiresIn?: string | number;
      sortBy?: string;
    } = {}) => {
      const result: Result = await this.fetcher("/project/file", {
        method: "post",
        data: { page, perPage, expiresIn, sortBy },
      });
      return result;
    },

    remove: async (fileId: string) => {
      return await this.fetcher("project/file/remove", {
        method: "post",
        data: { id: fileId },
      });
    },

    add: async (files: File[]) => {
      const formData = new FormData();
      for (const file of files) formData.append("files", file);

      return await this.fetcher("project/file/add", {
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  };

  static async addProject(email: string) {
    const client = Axios.create({
      baseURL: BASE_URL,
      method: "post",
      headers: { "Content-Type": "application/json" },
    });

    try {
      const result = await client.request({
        url: "project/add",
        data: { email },
      });
      const vyle = new Vyle(result.data.adminToken);
      await vyle.init();
      return vyle;
    } catch (error) {
      throw error;
    }
  }
}
