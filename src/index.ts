import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

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
  private token!: string;
  private baseUrl = "http://192.168.100.24:44650";
  private client: AxiosInstance;

  constructor(token: string) {
    this.token = token;
    this.client = Axios.create({
      baseURL: this.baseUrl,
      headers: {
        token: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async fetcher(url: string, config: AxiosRequestConfig = {}) {
    try {
      const results = await this.client.request({ url, ...config });
      return results.data;
    } catch (error) {
      throw error;
    }
  }

  async list(data: { [key: string]: any } = {}) {
    const result: Result = await this.fetcher("/file/list", {
      method: "post",
      data,
    });
    return result;
  }

  async remove(file: string) {
    return await this.fetcher("/file/remove", {
      method: "post",
      params: { file },
    });
  }

  async add(data: { files: File[] }) {
    const formData = new FormData();
    for (const file of data.files) formData.append("files", file);

    return await this.fetcher("/file", {
      method: "post",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
