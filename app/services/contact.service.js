const {objectid} = require("mongodb");

class ContactService {
    contructor(client){
        this.Contact = client.db().collection("contacts");

    }
    extractConactData(payload){
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
    Objects.keys(contact).forEach(
        (key) => contact[key] === undefined && delete contact[key]
    );
    return contact;
    }
    async create(payload){
        const contact = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            {$set: { favorite: contact.favorite === true}},
            {returnDocument: "after",upsert: true}
        );
        return result.value; 
    }
    async find(filter){
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }
    async findByName(name){
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }
    async findbyid(id){
        return await this.Contact.findOne({
            _id: objectId.isvalid(id) ? new objectId(id) : null,
        });
    }
}