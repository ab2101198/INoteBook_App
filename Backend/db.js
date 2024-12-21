const mongoose = require('mongoose') ;


const mongoURI = "mongodb+srv://ayush:ayushraj%40198@cluster0.ooyac.mongodb.net/NOTES?retryWrites=true&w=majority" 

const connectToMongo = () => {
      mongoose.connect(mongoURI).then
      ( () => console.log('Connected Successfully')).catch
      ((err)=>{ console.error(err) ;})
}

module.exports = connectToMongo 

