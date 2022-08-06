"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const logger_lindo_1 = require("./core/logger-lindo");
const update_all_1 = require("./update/update-all");
const main_window_1 = require("./windows/main-window");
const electron_1 = require("electron");
const settings = require('electron-settings');
const pkg = require(`${electron_1.app.getAppPath()}/package.json`);
class Application {
    static run() {
        this.version = pkg.version;
        update_all_1.UpdateAll.run().then((versions) => {
            settings.setSync('appVersion', versions.appVersion);
            this.remoteBuildVersion = versions.buildVersion;
            this.remoteAppVersion = versions.appVersion;
            logger_lindo_1.Logger.info("[APPLICATION] Starting..");
            this.canAddWindow = true;
            this.addWindow();
        }).catch((error) => {
            logger_lindo_1.Logger.error('Error occured on update process : ');
            logger_lindo_1.Logger.error(error);
            electron_1.dialog.showMessageBox(electron_1.BrowserWindow.getFocusedWindow(), {
                type: 'error',
                title: 'Error',
                message: "Error occured on update process.",
                buttons: ['Close']
            }).then(() => {
                electron_1.app.exit();
            });
        });
        //Renvoi de l'événement à toute les fenêtres
        electron_1.ipcMain.on('auto-group-reset-counter', (event, arg) => {
            this.mainWindows.forEach((gWindow, index) => {
                gWindow.win.webContents.send('auto-group-reset-counter');
            });
        });
        electron_1.ipcMain.on('auto-group-push-path', (event, arg) => {
            arg.unshift('auto-group-push-path');
            this.mainWindows.forEach((gWindow, index) => {
                gWindow.win.webContents.send.apply(gWindow.win.webContents, arg);
            });
        });
        electron_1.ipcMain.on('window-ready', (event, arg) => {
            this.mainWindows.forEach((gWindow, index) => {
                gWindow.win.webContents.send('window-ready');
            });
        });
        electron_1.app.on('second-instance', (event, commandLine, workingDirectory) => {
            if (this.canAddWindow)
                this.addWindow();
        });
        electron_1.app.setAppUserModelId('com.lindo.app');
    }
    static addWindow() {
        let gWindow = new main_window_1.MainWindow(this);
        gWindow.run();
        this.mainWindows.push(gWindow);
    }
}
exports.Application = Application;
Application.mainWindows = [];
Application.appPath = __dirname + '/../..';
Application.userDataPath = electron_1.app.getPath('userData');
Application.canAddWindow = false;
Application.skipAuthentication = false;
Application.isAuthenticated = false;
Application.masterPassword = "";
//# sourceMappingURL=application.js.map