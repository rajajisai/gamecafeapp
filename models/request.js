const mongoose = require ("mongoose");

const RequestSchema = new mongoose.Schema({
    wsname: String,
    reqbody:String,
    requestedBy:String
},{ timestamps : true});
mongoose.model("Request",RequestSchema);

module.exports= mongoose.model("Request", RequestSchema);
