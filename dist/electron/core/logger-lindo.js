"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston = require("winston");
const fs = require("fs");
require("winston-daily-rotate-file");
const application_1 = require("../application");
class LoggerLindo {
    constructor() {
        let LOGS_PATH = application_1.Application.userDataPath + '/logs/lindo';
        fs.mkdirSync(LOGS_PATH, { recursive: true });
        this.winston = winston.createLogger({
            transports: [
                new (winston.transports.Console)({
                    handleExceptions: true,
                    level: "debug",
                    format: winston.format.combine(winston.format.colorize(), winston.format.timestamp({ format: "HH:mm:ss" }), winston.format.printf(info => `${info.level} ${info.timestamp} : ${info.message}`))
                }),
                new winston.transports.DailyRotateFile({
                    filename: LOGS_PATH + '/logs-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: '28d',
                    handleExceptions: true,
                    level: "debug",
                    format: winston.format.combine(winston.format.timestamp({ format: "HH:mm:ss" }), winston.format.printf(info => `${info.level} ${info.timestamp} : ${info.message}`))
                }),
            ],
            exitOnError: false
        });
    }
}
exports.Logger = new LoggerLindo().winston;
//# sourceMappingURL=logger-lindo.js.map