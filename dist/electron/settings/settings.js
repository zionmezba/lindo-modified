"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const application_1 = require("../application");
const logger_lindo_1 = require("../core/logger-lindo");
const settings_checker_1 = require("./settings-checker");
const settings_default_1 = require("./settings-default");
const macAddress = require("macaddress");
const electron_1 = require("electron");
const rimraf = require("rimraf");
const settings = require('electron-settings');
const i18n = require('node-translate');
class Settings {
    static init() {
        (settings_checker_1.checkSettings()) ? null : this.resetSettings();
        if (!settings.getSync('language')) {
            const local = electron_1.app.getLocale();
            const shortLocal = local.slice(0, 1);
            switch (shortLocal) {
                // native language of DT
                case "fr":
                case "en":
                case "es":
                case "it":
                case "pt":
                    settings.setSync('language', shortLocal);
                    break;
                // language unavaible in DT
                case "pl":
                case "tr":
                default:
                    settings.setSync('language', 'en');
                    break;
            }
        }
        //Configure the local for electron
        i18n.requireLocales({
            'en': require(application_1.Application.appPath + `/dist/electron/i18n/en`),
            'fr': require(application_1.Application.appPath + `/dist/electron/i18n/fr`),
            'es': require(application_1.Application.appPath + `/dist/electron/i18n/es`),
            'it': require(application_1.Application.appPath + `/dist/electron/i18n/it`),
            'pl': require(application_1.Application.appPath + `/dist/electron/i18n/pl`),
            'tr': require(application_1.Application.appPath + `/dist/electron/i18n/tr`),
            'pt': require(application_1.Application.appPath + `/dist/electron/i18n/pt`)
        }).setLocale(settings.getSync('language'));
        electron_1.ipcMain.on('read-settings', (event, args) => {
            const value = settings.getSync(args[0]);
            event.returnValue = value;
        });
        electron_1.ipcMain.on('write-settings', (event, args) => {
            event.returnValue = settings.setSync(args[0], args[1]);
        });
        electron_1.ipcMain.on('reset-game', (event, args) => {
            this.resetGame();
        });
        electron_1.ipcMain.on('clear-cache', (event, args) => {
            this.clearCache();
        });
        electron_1.ipcMain.on('change-shortcuts', (event, args) => {
            this.reloadShortcut();
        });
        electron_1.ipcMain.on('change-language', (event, args) => {
            i18n.setLocale(args[0]);
            this.reloadSettings();
        });
    }
    static resetSettings() {
        logger_lindo_1.Logger.info("[SETTING] Restoring the settings..");
        settings.setSync(settings_default_1.SettingsDefault);
        macAddress.one((err, addr) => {
            if (err || !addr) {
                settings.setSync('macAddress', Math.random().toString());
                logger_lindo_1.Logger.warn("[SETTING] Unable to retrieve the mac address");
            }
            else {
                settings.setSync('macAddress', Buffer.from(addr).toString('base64'));
            }
            logger_lindo_1.Logger.info("[SETTING] All settings are restored.");
            this.reloadSettings();
        });
    }
    static reloadSettings() {
        application_1.Application.mainWindows.forEach((window) => {
            window.reloadSettings();
        });
    }
    static reloadShortcut() {
        application_1.Application.mainWindows.forEach((window) => {
            window.shortCuts.reload();
        });
    }
    static getAppConfig() {
        return {
            gamePath: application_1.Application.userDataPath + '/game',
            appPath: application_1.Application.appPath,
            platform: process.platform,
            language: settings.getSync('language')
        };
    }
    static resetGame() {
        const destinationPath = application_1.Application.userDataPath + '/game';
        rimraf(destinationPath, () => {
            electron_1.app.relaunch();
            electron_1.app.quit();
        });
    }
    static clearCache() {
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            application_1.Application.mainWindows.forEach((mainWindow) => {
                mainWindow.win.webContents.session.clearCache().then(() => {
                    resolve();
                });
            });
        }));
        Promise.all(promises).then(() => {
            electron_1.dialog.showMessageBox(electron_1.BrowserWindow.getFocusedWindow(), {
                type: 'info',
                title: i18n.t('options.clear-cache.title'),
                message: i18n.t('options.clear-cache.message'),
                buttons: ['OK']
            }).then(() => {
                electron_1.app.exit();
            });
        });
    }
}
exports.Settings = Settings;
//# sourceMappingURL=settings.js.map