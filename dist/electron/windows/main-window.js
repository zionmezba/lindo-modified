"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainWindow = void 0;
const logger_lindo_1 = require("../core/logger-lindo");
const application_1 = require("../application");
const game_menu_template_1 = require("../core/game-menu.template");
const shortcuts_1 = require("../core/shortcuts");
const user_agent_1 = require("../core/user-agent");
const electron_1 = require("electron");
const { webContents } = require('electron');
const settings = require('electron-settings');
const electron = require('electron');
class MainWindow {
    constructor(application) {
        this.events = [];
        this.application = application;
        let screenPoint = electron.screen.getCursorScreenPoint();
        let display = electron.screen.getDisplayNearestPoint(screenPoint);
        let displayWidth = display.size.width;
        let displayHeight = display.size.height;
        let applicationWidth = parseInt(settings.getSync('option.general.resolution').x);
        let applicationHeight = parseInt(settings.getSync('option.general.resolution').y);
        let applicationPositionX = display.bounds.x + ((displayWidth / 2) - (applicationWidth / 2));
        let applicationPositionY = display.bounds.y + ((displayHeight / 2) - (applicationHeight / 2));
        let windowId = MainWindow.count;
        this.win = new electron.BrowserWindow({
            width: applicationWidth,
            height: applicationHeight,
            x: applicationPositionX,
            y: applicationPositionY,
            frame: false,
            show: false,
            backgroundColor: '#e6e6e6',
            webPreferences: {
                defaultFontSize: 13,
                defaultEncoding: "UTF-8",
                backgroundThrottling: false,
                allowRunningInsecureContent: true,
                webSecurity: false,
                partition: 'persist:' + windowId,
                nodeIntegration: true,
                contextIsolation: false,
            }
        });
        if (settings.getSync('option.general.full_screen')) {
            this.win.setFullScreen(true);
        }
        MainWindow.count++;
        this.userAgent = new user_agent_1.UserAgent(windowId);
        this.win.webContents.setUserAgent(this.userAgent.getString());
        this.shortCuts = new shortcuts_1.ShortCuts(this.win);
        this.menu = electron_1.Menu.buildFromTemplate(game_menu_template_1.GameMenuTemplate.build());
        this.win.on('close', () => {
            let indexOfWindow = application_1.Application.mainWindows.findIndex((element) => {
                return element.win.id == this.win.id;
            });
            application_1.Application.mainWindows.splice(indexOfWindow, 1);
            if (application_1.Application.mainWindows.length == 0) {
                electron_1.app.quit();
            }
        });
    }
    reloadSettings() {
        logger_lindo_1.Logger.info('emit->reload-settings');
        this.win.webContents.send('reload-settings');
        electron_1.ipcMain.once('reload-settings-done', () => {
            this.win.webContents.send('reload-settings-done');
        });
        // Redraw the menu
        this.menu = electron_1.Menu.buildFromTemplate(game_menu_template_1.GameMenuTemplate.build());
        electron_1.Menu.setApplicationMenu(this.menu);
    }
    reloadShortcut() {
        this.shortCuts.reload();
    }
    run() {
        this.win.loadURL(`file://${application_1.Application.appPath}/dist/app/index.html`);
        this.win.once('ready-to-show', () => {
            this.win.show();
        });
        electron_1.Menu.setApplicationMenu(this.menu);
        // bind shortcuts
        this.shortCuts.enable();
        //On bloque les ouverture d'url
        this.win.webContents.on("new-window", (event, url) => {
            event.preventDefault();
        });
    }
}
exports.MainWindow = MainWindow;
MainWindow.count = 0;
//# sourceMappingURL=main-window.js.map