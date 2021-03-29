var crypto = require('crypto');

function getCheckSumName(fileName) {
    return generateChecksum(fileName);     
}

function generateChecksum(str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}

module.exports = {
    getCheckSumName
}