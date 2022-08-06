"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_lindo_1 = require("./core/logger-lindo");
const application_1 = require("./application");
const settings_1 = require("./settings/settings");
const electron_1 = require("electron");
const i18n = require('node-translate');
require('@electron/remote/main').initialize();
if (!electron_1.app.requestSingleInstanceLock()) {
    electron_1.app.quit();
}
electron_1.app.commandLine.appendSwitch('ignore-gpu-blacklist', 'true');
electron_1.app.commandLine.appendSwitch("disable-renderer-backgrounding");
electron_1.app.commandLine.appendSwitch("disable-background-timer-throttling");
//more webgl and less black screen
electron_1.app.commandLine.appendSwitch("max-active-webgl-contexts", "32");
electron_1.app.on('ready', () => {
    process.on('uncaughtException', function (error) {
        logger_lindo_1.Logger.error(error);
        electron_1.dialog.showMessageBox(electron_1.BrowserWindow.getFocusedWindow(), {
            type: 'error',
            title: i18n.t('uncaught-exception.title'),
            message: i18n.t('uncaught-exception.message'),
            buttons: [i18n.t('uncaught-exception.close')]
        }).then(function () {
            settings_1.Settings.resetSettings();
            electron_1.app.exit();
        });
    });
    settings_1.Settings.init();
    application_1.Application.run();
});
//# sourceMappingURL=main.js.map