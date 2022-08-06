"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMenuTemplate = void 0;
const application_1 = require("../application");
const shortcuts_1 = require("./shortcuts");
const electron_1 = require("electron");
const settings = require('electron-settings');
const i18n = require('node-translate');
class GameMenuTemplate {
    static build() {
        const template = [
            {
                label: i18n.t('game-menu.file.title'),
                submenu: [
                    {
                        label: i18n.t('game-menu.file.new-window'),
                        accelerator: shortcuts_1.ShortCuts.convert(settings.getSync('option.shortcuts.no_emu.new_window')),
                        click(item, focusedWindow) {
                            application_1.Application.addWindow();
                        }
                    },
                    {
                        label: i18n.t('game-menu.file.new-tab'),
                        accelerator: shortcuts_1.ShortCuts.convert(settings.getSync('option.shortcuts.no_emu.new_tab')),
                        click(item, focusedWindow) {
                            focusedWindow.webContents.send('new-tab', {});
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: i18n.t('game-menu.file.close-tab'),
                        accelerator: 'CmdOrCtrl+W',
                        click(item, focusedWindow) {
                            focusedWindow.webContents.send('close-tab', {});
                        }
                    },
                    {
                        label: i18n.t('game-menu.file.close-window'),
                        accelerator: 'Shift+CmdOrCtrl+W',
                        click(item, focusedWindow) {
                            focusedWindow.close();
                        }
                    }
                ]
            },
            {
                label: i18n.t('game-menu.edit.title'),
                submenu: [
                    {
                        label: i18n.t('game-menu.edit.undo'),
                        role: 'undo'
                    },
                    {
                        label: i18n.t('game-menu.edit.redo'),
                        role: 'redo'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: i18n.t('game-menu.edit.cut'),
                        role: 'cut'
                    },
                    {
                        label: i18n.t('game-menu.edit.copy'),
                        role: 'copy'
                    },
                    {
                        label: i18n.t('game-menu.edit.paste'),
                        role: 'paste'
                    },
                    {
                        label: i18n.t('game-menu.edit.selectall'),
                        role: 'selectAll'
                    }
                ]
            },
            {
                label: i18n.t('game-menu.window.title'),
                submenu: [
                    {
                        label: i18n.t('game-menu.window.reload'),
                        accelerator: 'CmdOrCtrl+R',
                        click(item, focusedWindow) {
                            if (focusedWindow)
                                focusedWindow.reload();
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: i18n.t('game-menu.window.prev-tab'),
                        accelerator: shortcuts_1.ShortCuts.convert(settings.getSync('option.shortcuts.no_emu.prev_tab')),
                        click(item, focusedWindow) {
                            focusedWindow.webContents.send('previous-tab', 'prev');
                        }
                    },
                    {
                        label: i18n.t('game-menu.window.next-tab'),
                        accelerator: shortcuts_1.ShortCuts.convert(settings.getSync('option.shortcuts.no_emu.next_tab')),
                        click(item, focusedWindow) {
                            focusedWindow.webContents.send('next-tab', 'next');
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        'label': i18n.t('game-menu.window.disable-sound'),
                        'type': "checkbox",
                        click(item, focusedWindow) {
                            focusedWindow.webContents.setAudioMuted(item.checked);
                        }
                    },
                    {
                        label: i18n.t('game-menu.window.zoomin'),
                        role: 'zoomIn'
                    },
                    {
                        label: i18n.t('game-menu.window.zoomout'),
                        role: 'zoomOut'
                    },
                    {
                        label: i18n.t('game-menu.window.resetzoom'),
                        role: 'resetZoom'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: i18n.t('game-menu.window.full-screen'),
                        role: 'togglefullscreen'
                    }
                ]
            },
            {
                label: i18n.t('game-menu.infos.title'),
                submenu: [
                    {
                        label: i18n.t('game-menu.infos.console'),
                        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                        click(item, focusedWindow) {
                            if (focusedWindow)
                                focusedWindow.webContents.toggleDevTools();
                        }
                    }
                ]
            }
        ];
        if (process.platform === 'darwin') {
            this.darwin(template);
        }
        return template;
    }
    static darwin(template) {
        template.unshift({
            label: electron_1.app.getName(),
            submenu: [
                {
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    role: 'hide'
                },
                {
                    role: 'hideothers'
                },
                {
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        });
        // Edit menu.
        template[2].submenu.push({
            type: 'separator'
        }, {
            label: i18n.t('game-menu.window.sound'),
            submenu: [
                {
                    label: i18n.t('game-menu.window.enable-sound'),
                    role: 'startspeaking'
                },
                {
                    label: i18n.t('game-menu.window.disable-sound'),
                    role: 'stopspeaking'
                }
            ]
        });
    }
}
exports.GameMenuTemplate = GameMenuTemplate;
//# sourceMappingURL=game-menu.template.js.map