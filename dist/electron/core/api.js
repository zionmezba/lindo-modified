"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const axios_1 = require("axios");
const settings = require('electron-settings');
class Api {
    static getRemoteVersion() {
        return new Promise((resolve, reject) => {
            axios_1.default.get(this.apiUrl + '/version.json?time=' + new Date().getTime()).then((response) => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    }
    static getUpdateInformations() {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams({
                version: settings.getSync('buildVersion'),
                os: process.platform,
                time: new Date().getTime().toString(),
                lindo: "1"
            });
            axios_1.default.get(this.apiUrl + '/update.php?' + params.toString()).then((response) => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.Api = Api;
Api.apiUrl = "https://api.lindo-app.com";
//# sourceMappingURL=api.js.map