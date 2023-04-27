import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class Vyle {
  private token!: string;
  private baseUrl = "http://192.168.100.24:44650";
  private client: AxiosInstance;

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

  async fetcher(url: string, config: AxiosRequestConfig = {}) {
    try {
      const results = await this.client.request({ url, ...config });
      return results.data;
    } catch (error) {
      throw error;
    }
  }

  async list(data: { [key: string]: any } = {}) {
    return await this.fetcher("/file/list", { method: "post", data });
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
