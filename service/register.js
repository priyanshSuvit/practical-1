const { user } = require('../models/users');
const generateUniqueId = require('generate-unique-id');
const { response } = require('express');

async function register(req, arg) {

        try {
            let response;
            if (arg == "many") {
                let doc = [];
                req.forEach(element => {
                    const id = generateUniqueId();
                    let request = { ...element,id : id};
                    doc.push(request);
                });
                 response = await user.insertMany(doc, { ordered: true });
            } else if (arg == "one") {
                // req.forEach(element => {
                //     const id = generateUniqueId();
                //     let request = { ...element,id : id};
                //     doc.push(request);
                // });
                //  response = await user.insertMany(doc, { ordered: false });
                // let result = await  user.find( { userName : request.userName})
                const id = generateUniqueId();
                let request = { ...req, id: id };
                const newUser = new user(request)
                 response = await newUser.save();
            }
            return response;
        } catch (err) {
            return {
                _isError: true,
                error: err,
                response : response
            }
        }
}
module.exports = { register };