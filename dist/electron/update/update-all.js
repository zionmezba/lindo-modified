"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAll = void 0;
const api_1 = require("../core/api");
const logger_lindo_1 = require("../core/logger-lindo");
const update_app_1 = require("./update-app");
const update_game_1 = require("./update-game");
const settings = require('electron-settings');
class UpdateAll {
    static run() {
        return new Promise((resolve, reject) => {
            api_1.Api.getUpdateInformations().then((response) => {
                let doAppUpdate = update_app_1.UpdateApp.check(response);
                if (doAppUpdate) {
                    logger_lindo_1.Logger.info("[UPDATE] Application update required.");
                    return update_app_1.UpdateApp.update(response);
                }
                else {
                    logger_lindo_1.Logger.info("[UPDATE] Application is up to date.");
                    return new Promise((resolve) => { resolve(response); });
                }
            })
                .catch(() => {
                logger_lindo_1.Logger.warn("[UPDATE] Skipping app check");
            })
                .then(() => {
                update_game_1.UpdateGame.officialUpdate().then((versions) => {
                    resolve(versions);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
}
exports.UpdateAll = UpdateAll;
//# sourceMappingURL=update-all.js.map