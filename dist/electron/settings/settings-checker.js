"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSettings = void 0;
const logger_lindo_1 = require("../core/logger-lindo");
const settings_default_1 = require("./settings-default");
const macAddress = require("macaddress");
const settings = require('electron-settings');
function checkSettings() {
    logger_lindo_1.Logger.info("[SETTING] Checking settings integrity..");
    let sett = settings.getSync();
    if (sett.option === undefined) {
        return false;
    }
    function checkRecursive(settings, defaultSettings, depth) {
        let pass = true;
        for (let id in defaultSettings) {
            if (Array.isArray(defaultSettings[id])) {
                if (!Array.isArray(settings[id]) || typeof settings[id] !== 'object') {
                    logger_lindo_1.Logger.info('Error with setting ' + '.'.repeat(depth) + id);
                    logger_lindo_1.Logger.info('-> Current value:  ' + ' '.repeat(depth) + settings[id]);
                    settings[id] = defaultSettings[id];
                    pass = false;
                }
            }
            else {
                if (typeof defaultSettings[id] !== typeof settings[id] && defaultSettings[id] !== null) {
                    logger_lindo_1.Logger.info('Error with setting ' + '.'.repeat(depth) + id);
                    logger_lindo_1.Logger.info('-> Current value:  ' + ' '.repeat(depth) + settings[id]);
                    settings[id] = defaultSettings[id];
                    pass = false;
                }
            }
            if (typeof defaultSettings[id] === 'object') {
                if (!checkRecursive(settings[id], defaultSettings[id], depth + 1)) {
                    logger_lindo_1.Logger.info('Error in           ' + '.'.repeat(depth) + id);
                    pass = false;
                }
            }
        }
        return pass;
    }
    let ok = checkRecursive(sett, settings_default_1.SettingsDefault, 0);
    if (!ok) {
        logger_lindo_1.Logger.info('Replacing settings above by defaults');
        settings.setSync(sett);
        ok = checkRecursive(sett, settings_default_1.SettingsDefault, 0);
    }
    sett.alertCounter = Math.floor(sett.alertCounter);
    if (!sett.option.general.resolution.x || !sett.option.general.resolution.y) {
        ok = false;
    }
    else {
        sett.option.general.resolution.x = Math.floor(sett.option.general.resolution.x);
        sett.option.general.resolution.y = Math.floor(sett.option.general.resolution.y);
    }
    if (!settings.getSync('macAddress')) {
        macAddress.one((err, addr) => {
            if (err || !addr) {
                settings.setSync('macAddress', Math.random().toString());
                logger_lindo_1.Logger.warn("[SETTING] Unable to retrieve the mac address");
            }
            else {
                settings.setSync('macAddress', Buffer.from(addr).toString('base64'));
            }
        });
    }
    (ok) ? logger_lindo_1.Logger.info("[SETTING] Settings are correct.") : logger_lindo_1.Logger.error("[SETTING] Problem detected in settings.");
    return ok;
}
exports.checkSettings = checkSettings;
//# sourceMappingURL=settings-checker.js.map