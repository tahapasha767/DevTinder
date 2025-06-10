const mongoose = require('mongoose'); // You don't need the destructuring
var validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 3) {
                throw new Error("First name error: must be at least 3 characters long.");
            }
            else if (value.length > 20) {
                throw new Error("First name error: must be at most 20 characters long.");
            }
        }
    },
    lastName: {
        type: String,
        validate(value) {
            if (value.length < 3) {
                throw new Error("Last name error: must be at least 3 characters long.");
            }
            else if (value.length > 20) {
                throw new Error("Last name error: must be at most 20 characters long.");
            }
        }
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Email error: invalid email format.");
            }
        },
        immutable: true, // This makes the email immutable after creation
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })) {
                throw new Error("Password error: must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol.");
            }
        }
    },
    age: {
        type: Number,
        required: true,
        min: 16,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female"].includes(value)) {
                throw new Error("Gender error: only 'male' or 'female' allowed.");
            }
        },
    },
    skills:{
        type:[String],
        required: true,
        validate(value){
            if(value.length<1){
                throw new Error("Skills error: at least one skill is required.");
            }
            if(value.length>10)
            {
                throw new Error("Skills error:at most 10 skills are allowed.");
            }
        }
    },
    about:{
        type:String,
        validate(value) {
            if (value.length < 10) {
                throw new Error("About error: must be at least 10 characters long.");
            }
            else if (value.length > 100) {
                throw new Error("About error: must be at most 100 characters long.");
            }
        },trim: true

    },
    photo:{
        type:String

    }
});

module.exports = mongoose.model("User", userSchema);
