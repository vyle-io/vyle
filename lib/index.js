"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var BASE_URL = "http://34.71.110.209:44800"; // "http://localhost:44800";
var Vyle = /** @class */ (function () {
    function Vyle(token) {
        var _this = this;
        this.baseUrl = BASE_URL;
        this.inited = false;
        this.file = {
            list: function (_a) {
                var _b = _a === void 0 ? {} : _a, page = _b.page, perPage = _b.perPage, expiresIn = _b.expiresIn;
                return __awaiter(_this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, this.fetcher("/project/file", {
                                    method: "post",
                                    data: { page: page, perPage: perPage, expiresIn: expiresIn },
                                })];
                            case 1:
                                result = _c.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
            remove: function (file) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fetcher("project//file/remove", {
                                method: "post",
                                params: { file: file },
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            add: function (files) { return __awaiter(_this, void 0, void 0, function () {
                var formData, _i, files_1, file;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formData = new FormData();
                            for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                                file = files_1[_i];
                                formData.append("files", file);
                            }
                            return [4 /*yield*/, this.fetcher("project/file/add", {
                                    method: "post",
                                    data: formData,
                                    headers: { "Content-Type": "multipart/form-data" },
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
        };
        this.token = token;
        this.client = axios_1.default.create({
            baseURL: this.baseUrl,
            headers: {
                Authorization: "Bearer ".concat(this.token),
                "Content-Type": "application/json",
            },
        });
    }
    Vyle.prototype.fetcher = function (url, config) {
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var results, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.inited)
                            throw "Vyle not initialized";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.request(__assign({ url: url }, config))];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, results.data];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Vyle.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inited = true;
                        return [4 /*yield*/, this.fetcher("project/current")];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            this.inited = false;
                            throw "project_not_found";
                        }
                        this.project = result;
                        return [2 /*return*/, this.project];
                }
            });
        });
    };
    Vyle.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetcher("project/remove", { method: "POST" })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Vyle.addProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, result, vyle, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = axios_1.default.create({
                            baseURL: BASE_URL,
                            method: "post",
                            headers: { "Content-Type": "application/json" },
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, client.request({ url: "project/add" })];
                    case 2:
                        result = _a.sent();
                        vyle = new Vyle(result.data.adminToken);
                        return [4 /*yield*/, vyle.init()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, vyle];
                    case 4:
                        error_2 = _a.sent();
                        throw error_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Vyle;
}());
exports.default = Vyle;
//# sourceMappingURL=index.js.map