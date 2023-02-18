const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

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
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length===0){
     return next(new ApiError(400,"Data to update cannot be empty"));
    }
    try {
     const ContactServices = new ContactServices(MongoDB.client);
     const document = ContactServices.update(req.params.id,req.body);
     if (!document) {
         return next(
             new ApiError(404, 'contact not found'));
     }
     return res.send({message: "contact was updated successfully"});
    }catch(err){
     return next(
         new ApiError(500,`error updating contact with id=${req.params.id}`)
     );
    }
 };
 exports.delete = async (req, res, next) => {
    try {
        const ContactServices = new ContactServices(MongoDB.client);
        const document = ContactServices.delete(req.params.id);
        if (!document) {
            return next(
                new ApiError(404, 'contact not found'));
        }
        return res.send({message: "contact was deleted successfully"});
       }catch(err){
        return next(
            new ApiError(500,`error deleted contact with id=${req.params.id}`)
        );
       }
};
exports.deleteALL = async (_req, res, next) => {
    try {
        const ContactServices = new ContactServices(MongoDB.client);
        const deletedCount = await ContactServices.deleteALl();
        return res.send({message: `${deletedCount}}contact was deleted successfully`});
    }catch(err){
        return next(
            new ApiError(500,`an error occurred while retrieving favorite contacts`)
        );
       }
};
exports.findALLFavorite = async (_req, res, next) => {
    try {
        const ContactServices = new ContactServices(MongoDB.client);
        const document = ContactServices.findALlFavorite();
        return res.send(documents);
       }catch(err){
        return next(
            new ApiError(500,`an error occurred while retrieving favorite contacts`)
        );
       }
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