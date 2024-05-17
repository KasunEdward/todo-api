const {Schema, model} = require("../db/connection");

//User Schema
const UserSchema = new Schema({
    userName:{type:String, unique: true, required: true},
    password:{type: String, required: true}
});

const User = model("User", UserSchema);

module.exports = User;