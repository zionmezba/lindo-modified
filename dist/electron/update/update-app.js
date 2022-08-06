"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApp = void 0;
const application_1 = require("../application");
const logger_lindo_1 = require("../core/logger-lindo");
const electron_1 = require("electron");
const compareVersions = require('compare-versions');
const i18n = require('node-translate');
class UpdateApp {
    static check(response) {
        logger_lindo_1.Logger.info("[UPDATE] Check the application version..");
        const diff = compareVersions(application_1.Application.version, response.noemu.version);
        return (diff == -1);
    }
    static update(response) {
        return new Promise((resolve, reject) => {
            UpdateApp.openUpdateInfo(response).then(() => {
                resolve(response);
            });
        });
    }
    static openUpdateInfo(response) {
        return new Promise((resolve, reject) => {
            let message = i18n.t('updater.new-update.default');
            let buttons = [i18n.t('updater.new-update.go-site')];
            if (!response.noemu.required) {
                buttons.push(i18n.t('updater.new-update.ignore'));
            }
            else {
                message = i18n.t('updater.new-update.required');
            }
            logger_lindo_1.Logger.info("[UPDATE] App update alert given..");
            electron_1.dialog.showMessageBox(electron_1.BrowserWindow.getFocusedWindow(), {
                type: 'info',
                title: i18n.t('updater.new-update.title', { version: response.noemu.version }),
                message: message,
                buttons: buttons,
            }).then((returnValue) => {
                if (returnValue.response == 0) {
                    logger_lindo_1.Logger.info("[UPDATE] Redirected to app download page.");
                    electron_1.shell.openExternal("https://lindo-app.com");
                    electron_1.app.exit();
                }
                else {
                    logger_lindo_1.Logger.warn("[UPDATE] App update ingored.");
                    resolve();
                }
            });
        });
    }
}
exports.UpdateApp = UpdateApp;
//# sourceMappingURL=update-app.js.map