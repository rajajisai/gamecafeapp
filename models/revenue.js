const mongoose = require ("mongoose");

const RevenueSchema = new mongoose.Schema({
    date: String,
    amount:{type:Number,default:0}
    
},{ timestamps : true});
mongoose.model("Revenue",RevenueSchema);