"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const BASE_URL = "http://34.71.110.209:44800";
const LOCAL_BASE_URL = "http://localhost:44800";
class Vyle {
    constructor(token) {
        this.baseUrl = BASE_URL;
        this.inited = false;
        this.file = {
            list: ({ page, perPage, expiresIn, sortBy, } = {}) => __awaiter(this, void 0, void 0, function* () {
                const result = yield this.fetcher("/project/file", {
                    method: "post",
                    data: { page, perPage, expiresIn, sortBy },
                });
                return result;
            }),
            remove: (fileId) => __awaiter(this, void 0, void 0, function* () {
                return yield this.fetcher("project/file/remove", {
                    method: "post",
                    data: { id: fileId },
                });
            }),
            add: (files) => __awaiter(this, void 0, void 0, function* () {
                const formData = new FormData();
                for (const file of files)
                    formData.append("files", file);
                return yield this.fetcher("project/file/add", {
                    method: "post",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }),
        };
        this.token = token;
        this.client = axios_1.default.create({
            baseURL: this.baseUrl,
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-Type": "application/json",
            },
        });
    }
    fetcher(url, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.inited)
                throw "Vyle not initialized";
            try {
                const results = yield this.client.request(Object.assign({ url }, config));
                return results.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.inited = true;
            const result = yield this.fetcher("project/current");
            if (!result) {
                this.inited = false;
                throw "project_not_found";
            }
            this.project = result;
            return this.project;
        });
    }
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetcher("project/remove", { method: "POST" });
        });
    }
    static addProject(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = axios_1.default.create({
                baseURL: BASE_URL,
                method: "post",
                headers: { "Content-Type": "application/json" },
            });
            try {
                const result = yield client.request({
                    url: "project/add",
                    data: { email },
                });
                const vyle = new Vyle(result.data.adminToken);
                yield vyle.init();
                return vyle;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = Vyle;
//# sourceMappingURL=index.js.map