const mongoose = require('mongoose') ;


const mongoURI = "mongodb://0.0.0.0:27017/inotebook" 

const connectToMongo = () => {
      mongoose.connect(mongoURI).then
      ( () => console.log('Connected Successfully')).catch
      ((err)=>{ console.error(err) ;})
}

module.exports = connectToMongo 

