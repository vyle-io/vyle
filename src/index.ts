import Axios, { AxiosInstance } from "axios";

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

  async fetcher(url: string, params: any = {}) {
    try {
      const results = await this.client.request({ url, ...params });
      return results.data;
    } catch (error) {
      throw error;
    }
  }

  async list(body: { [key: string]: any } = {}) {
    return await this.fetcher("/file/list", { method: "post", body });
  }

  async remove(file: string) {
    return await this.fetcher("/file/remove", {
      method: "post",
      params: { file },
    });
  }

  async add(body: { files: File[] }) {
    const formData = new FormData();
    for (const file of body.files) formData.append("files", file);

    return await this.fetcher("/file", { method: "post", body: formData });
  }
}
