const fs = require('fs');
const path = require('path');
const baseName = path.basename(module.filename);
const basePath = __dirname;
const Sequelize = require('sequelize');
const cfg = require('../config/database');
const models = {};

const DB = new Sequelize(
    cfg.database,
    cfg.username,
    cfg.password,
    {
        dialect: cfg.dialect,
        host: cfg.host,
        port: cfg.port,
        define: {
            // 默认驼峰命名 false 下划线蛇形 true
            underscored: false
        }
    }
);

fs.readdirSync(basePath).filter((file) => {
    return file !== baseName && file.slice(-3) === '.js';
}).forEach((file) => {
    let model = require(path.join(basePath, file))(DB, Sequelize.DataTypes);
    models[model.name] = model;
});
// Object.keys(models).forEach(function (modelName) {
//     if (models[modelName].associate) {
//         models[modelName].associate(models);
//     }
// });

models.sequelize = DB;
models.Op = DB.Op;

module.exports = models;