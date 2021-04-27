const mongoose = require ("mongoose");

const StaffSchema = new mongoose.Schema({
    name: String,
    email: String,
    username:String,
    type:String,
    password : String,
    
},{ timestamps : true});
mongoose.model("Manager",StaffSchema);

module.exports= mongoose.model("Manager", StaffSchema);