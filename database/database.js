const mongoose =  require('mongoose');
require('dotenv').config();
const dbconnection =  async ()=>{
    try{
       await mongoose.connect(process.env.URL);
        console.log('DataBase is Connected');
    }
    catch(error){
        console.log('DataBase is not connected');
        process.exit(1);
    }
}
module.exports =  dbconnection;