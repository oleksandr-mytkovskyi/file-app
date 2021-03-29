const fileServices = require('../services/file.services');

exports.saveFile = (req, res, next) => {

    const fileName = req.get('Content-Disposition');
    req.pipe(fileServices.createTransformStream(fileName));
    res.status(200).send();
}

exports.getFile = (req, res, next) => {
    fileServices.getAll(req, res, next);
     // res.status(200).send();
}