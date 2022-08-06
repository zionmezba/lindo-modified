"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGame = void 0;
const logger_lindo_1 = require("../core/logger-lindo");
const application_1 = require("../application");
const update_window_1 = require("../windows/update-window");
const electron_1 = require("electron");
const settings = require('electron-settings');
class UpdateGame {
    static officialUpdate() {
        return new Promise((resolve, reject) => {
            logger_lindo_1.Logger.info("[UPDATE] Game update started..");
            let destinationPath = application_1.Application.userDataPath + '/game';
            this.updateWindow = update_window_1.UpdateWindow.createWindow();
            this.updateWindow.loadURL(`file://${application_1.Application.appPath}/dist/app/index.html#/official-game-update/` + encodeURIComponent(destinationPath));
            electron_1.ipcMain.on('update-finished', (event, args) => {
                logger_lindo_1.Logger.info("[UPDATE] Game update finished.");
                settings.setSync('buildVersion', args[0].buildVersion);
                this.updateWindow.close();
                resolve(args[0]);
            });
        });
    }
}
exports.UpdateGame = UpdateGame;
//# sourceMappingURL=update-game.js.map