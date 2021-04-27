const mongoose = require ("mongoose");
const workstationModel = require('./workstation');
const workStationSchema = new mongoose.Schema({id : String , pic : String, name : String , allSlotsFull : Boolean});
const dateSchema = new mongoose.Schema({
    workStations:[workStationSchema],
    date:String,
    
});
mongoose.model("Date",dateSchema);

module.exports= mongoose.model("Date", dateSchema);