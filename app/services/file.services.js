const { Transform } = require('stream');
const db = require('../model/index');
const Files = db.files;
const generetaFileName = require('../utils/generateFileName');
const { main } = require('../module/azure.blob');

exports.createTransformStream = (fileName) => {
    //create transform stream and implement _transform
    try {
    const myTransform = new Transform();
    myTransform._transform =  function (chunk, enc, next) {
        this.push(chunk);
        next();
    };
    const newFileName = generetaFileName.createFileName(fileName);
    main(myTransform, newFileName);
 
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

exports.saveData = async (data) => {
    const file = new Files(data);
    await file.save(file);
}