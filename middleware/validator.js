const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports.validate = (req,res,next) => {
        let data = req.body;
        if (req.baseUrl.includes("login")) {
            let errors = {};
            
            data.userName = !isEmpty(data.userName) ? data.userName : "";
            data.password = !isEmpty(data.password) ? data.password : "";
            if (Validator.isEmpty(data.userName)) {
              errors.userName = "userName field is required";
            }
            if (Validator.isEmpty(data.password)) {
              errors.password = "Password field is required";
            }
            if(isEmpty(errors)){
                return next();
            }else {
                return res.send(errors);
            }
        }else {
            let errors = {};
            data.userName = !isEmpty(data.userName) ? data.userName : "";
            data.email = !isEmpty(data.email) ? data.email : "";
            data.password = !isEmpty(data.password) ? data.password : "";
            data.role = !isEmpty(data.role) ?  data.role : "";
            // Name checks
            if (Validator.isEmpty(data.userName)) {
              errors.name = "Name field is required";
            }
            // Email checks
            if (Validator.isEmpty(data.email)) {
              errors.email = "Email field is required";
            } else if (!Validator.isEmail(data.email)) {
              errors.email = "Email is invalid";
            }
            // Password checks
            if (Validator.isEmpty(data.password)) {
              errors.password = "Password field is required";
            }
            if (Validator.isEmpty(data.role)) {
                errors.role = "role is required";
              }
            if (isEmpty(errors)) {
                return next();
            }else{
                return res.send(errors);
            }
        }
};