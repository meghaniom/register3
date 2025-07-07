const mongoose = require('mongoose');


 const dbConnect = async() => {
    try {
        const mongoDB = await mongoose.connect('mongodb://localhost:27017/register');
        console.log('MongoDB connected');
    }
    catch(err) {
        console.log('MongoDB connection error');
        process.exit(1);
    }
  }
   module.exports = dbConnect;