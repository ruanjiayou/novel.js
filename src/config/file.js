const config = {
    dest: './tmp/',
    limits: {
        fieldNameSize: 100,
        fileSize: 1024 * 1024 * 1024,
        fields: 100
    }
};

module.exports = config;