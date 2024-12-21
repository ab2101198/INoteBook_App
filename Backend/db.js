const mongoose = require('mongoose') ;


const mongoURI = "mongodb+srv://ayush:ayushraj@198@cluster0.ooyac.mongodb.net/NOTES?retryWrites=true&w=majority&appName=Cluster0" 

const connectToMongo = () => {
      mongoose.connect(mongoURI).then
      ( () => console.log('Connected Successfully')).catch
      ((err)=>{ console.error(err) ;})
}

module.exports = connectToMongo 

