"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortCuts = void 0;
const logger_lindo_1 = require("./logger-lindo");
const electronLocalshortcut = require('electron-localshortcut');
const settings = require('electron-settings');
const async = require('async');
/** TODO a déplacer dans l'app */
class ShortCuts {
    constructor(win) {
        this.win = win;
        this.isBinded = false;
    }
    bindAll() {
        let errorConsoleFunction = console.error;
        console.error = function () { };
        async.forEachOf(settings.getSync('option.shortcuts.no_emu.tabs'), (shortcut, index) => {
            if (shortcut) {
                try {
                    electronLocalshortcut.register(this.win, ShortCuts.convert(shortcut), () => {
                        this.win.webContents.send('switch-tab', index);
                    });
                }
                catch (e) {
                    //console.log(e);
                }
            }
        });
        console.error = errorConsoleFunction;
    }
    reload() {
        electronLocalshortcut.unregisterAll(this.win);
        this.bindAll();
        logger_lindo_1.Logger.info('emit->reload-shortcuts');
        this.win.webContents.send('reload-shortcuts');
    }
    enable() {
        if (!this.isBinded) {
            this.bindAll();
        }
        else {
            electronLocalshortcut.enableAll(this.win);
        }
    }
    disable() {
        electronLocalshortcut.disableAll(this.win);
    }
    static convert(shortcut) {
        shortcut = shortcut.replace('ctrl', 'CmdOrCtrl');
        return shortcut;
    }
}
exports.ShortCuts = ShortCuts;
//# sourceMappingURL=shortcuts.js.map