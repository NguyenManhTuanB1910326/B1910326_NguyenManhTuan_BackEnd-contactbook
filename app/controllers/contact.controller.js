const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const ContactService = require("../services/contact.service");

exports.create = (req, res) => {
    res.send({ message: "create handler"});
};
exports.findALL = async (req, res, next) => {
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documentuments = awaitcontactService.find({});
        }
    } catch (err) {
        return next(
            new ApiError(500, "an error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};
exports.findOne = async(req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(
                500,
                'Error retrieving contact with id=${req.params.id}'
            )
        );
    }
};
exports.update = async(req, res, next ) => {

};
exports.delete = (req, res) => {
    res.send({message: "delete handler"});
};
exports.deleteALL = (req, res) => {
    res.send({ message: "deleteALL handler"});
};
exports.findALLFavorite = (req, res) =>{
    res.send({ message: "findALLFavorite handler"});
};
exports.create = async(req, res, next)=> {
    if(!req.body?.name){
        return next(new ApiError(400,"Name can not be empty"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch(error){
        return next(
            new ApiError(500,"An error occurred while creating the contact")
        );
    }
};