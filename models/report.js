const mongoose = require ("mongoose");

const ReportSchema = new mongoose.Schema({
    report : String,
    workStationID : String,
    staffID : String,
    
},{ timestamps : true});
mongoose.model("Report",ReportSchema);

module.exports= mongoose.model("Report", ReportSchema);