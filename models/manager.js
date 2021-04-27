const mongoose = require ("mongoose");

const ManagerSchema = new mongoose.Schema({
    name: String,
    email: String,
    username : String,
    password : String,
    
},{ timestamps : true});
mongoose.model("staff",MangerSchema);

module.exports= mongoose.model("staff", ManagerSchema);