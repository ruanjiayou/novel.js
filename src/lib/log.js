const config = require('../config/log');
const log4js = require('log4js');
const debug = require('debug')('APP:LOG');
// 配置日志
log4js.configure({
    appenders: { info: { type: config.type, filename: config.filename } },
    categories: { default: { appenders: ['info'], level: config.level } }
});
const logger = log4js.getLogger();
let handle;
switch (config.type) {
    case 'null':
        handle = false;
        break;
    case 'debug':
        handle = function (sql) {
            debug(sql);
        };
        break;
    case 'fileSync':
        handle = function (sql) {
            console.log(sql);
            logger.info(sql);
        };
        break;
    default:
        handle = false;
        break;
}
module.exports = handle;