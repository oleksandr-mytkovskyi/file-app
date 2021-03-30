const { BlobServiceClient } = require('@azure/storage-blob');
const fileServices = require('../services/file.services');
const dotenv = require('dotenv');

dotenv.config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = process.env.CONTAINER_NAME;

//connect to azure and create blob
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
// Create the container
containerClient.createIfNotExists({access: 'blob'});
async function main(myTransform, newFileName) {
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
    // Save DB
    fileServices.saveData(data);
    } catch(e) {
        throw new Error(e); 
    }
}
module.exports = {
    main,
    blobServiceClient,
    containerClient
}