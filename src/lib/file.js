const multer = require('multer');
//const multerAutoReap = require('multer-autoreap');
const mime = require('mime');
const config = require('../config/file');
const io = require('utils2/lib/io');
const path = require('path');

// 上传路径处理 ,上传文件重命名
let storage = multer.diskStorage({
    // 上传路径处理
    // destination: `${process.cwd()}/public`,
    //destination: path.join(process.cwd(), 'tmp'),
    destination: config.dest,
    filename: function (req, file, cb) {  // file上传的文件信息, callback 重命名处理
        const extensions = 'ics,pdf,doc,docx,xls,xlsx,csv,txt,rtf,html,zip,mp3,wma,mpg,flv,avi,jpg,jpeg,png,gif'.split(',');
        // file.mimetype === 'image/gif'
        let ext = path.extname(file.originalname).substring(1).toLowerCase();
        if (extensions.indexOf(ext) === -1) {
            return cb(new HinterError('file', 'unsupportedFormat'));
        }
        //return cb(null, true);
        console.log(file.mimetype);
        return cb(null, `${io.GUID()}.${mime.extension(file.mimetype)}`);
    }
});

const fileFilter = function (req, file, cb) {
    const extensions = 'ics,pdf,doc,docx,xls,xlsx,csv,txt,rtf,html,zip,mp3,wma,mpg,flv,avi,jpg,jpeg,png,gif'.split(',');
    // file.mimetype === 'image/gif'
    let ext = path.extname(file.originalname).substring(1).toLowerCase();
    if (extensions.indexOf(ext) === -1) {
        cb(null, false);
    } else {
        cb(null, true);//允许
    }
};

let uploader = multer({
    // 上传文件路径,名字设置
    storage: storage,
    limits: config.limits, //限制文件的大小
    fileFilter: fileFilter //文件的类型, 过滤
}).fields([{
    name: 'file',
    maxCount: 10
}]);



module.exports = uploader;;
