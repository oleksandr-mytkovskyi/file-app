const { Transform } = require('stream');
const db = require('../model/index');
const Files = db.files;
const generetaFileName = require('../utils/generateFileName');
const { blobServiceClient, containerClient } = require('../module/azure.blob');

exports.createTransformStream = (fileName) => {
    //create transform stream and implement _transform
    try {
    const myTransform = new Transform();
    myTransform._transform =  function (chunk, enc, next) {
        this.push(chunk);
        next();
    };
    const newFileName = generetaFileName.createFileName(fileName);
    async function main() {
        try{
        const blockBlobClient = containerClient.getBlockBlobClient(newFileName);
        await blockBlobClient.uploadStream(myTransform);
        const properties = await blockBlobClient.getProperties()
        const {accessTier, createdOn, lastModified, contentLength } = properties;
        const {name, url} = blockBlobClient;
        const data = {
            name: name,
            url, url,
            tier: accessTier,
            createdOn: createdOn,
            lastModified: lastModified,
            size: contentLength
        };
        console.log(data);
        //Save in DB
        const file = new Files(data);
        const resSave = await file.save(file);
        // const resSave = await saveData(data);
        console.log(resSave);
        } catch(e) {
            throw new Error(e); 
        }
    }
    main();
 
    return myTransform;
    } catch(e) {
        throw new Error(e);
    }
}   

exports.getAll = async (req, res, next) => { 
    try{
        const data = await Files.find({})
        console.log(data);
        res.status(200).send(data);
    } catch(e) {
        throw new Error(e);
    }
}

// async function saveData(data) {
//     const file = new Files(data);
//     return await file.save(file);
// }