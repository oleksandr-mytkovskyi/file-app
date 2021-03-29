const getCheckSumName = require('./checkSum');

function createFileName(fileName) {
    const checkSum = getCheckSumName.getCheckSumName(fileName);
    const date = new Date().toISOString().replace(/[:]/g, '-');
    //have bug for file for example: ABC.DEF 
    const formatIndex = fileName.lastIndexOf('.');
    let fileFormat = '';
    if(formatIndex) fileFormat = fileName.substr(formatIndex);
    // get new filename
    const newFileName = `${checkSum}-${date}${fileFormat}`;
    return newFileName;
}

module.exports = {
    createFileName
}