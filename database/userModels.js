const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema(
    {
         name : {
            type : String,
            required:[true, 'name is required']
         },
         email : {
            type : String,
            required:[true, 'email is required']
         },
         password : {
            type : String,
            required:[true, 'password is required']
         },
         PhoneNumber: {
            type: String,
            validate: {
                validator: (val) => {
                    if(val>0){
                        const phoneNumberRegex = /^\d{10}$/;
                        return phoneNumberRegex.test(val);
                    }
                    return true;
                },
                message: "Invalid phone number format"
            }
        },
        Gender: {
            type: String
        },
        DOB: {
            type: Date,
        },
        Age: {
            type: Number,
        }
    },{ timestamps: true }
);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;



