const connectToMongo = require('./db') ;
const express = require('express')
var cors = require('cors') 

connectToMongo() ;
const app = express()
const port = process.env.PORT || 5000

app.use(cors({
  origin: 'https://your-frontend.onrender.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})) 

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Available routes
app.use('/api/auth', require('./routes/auth')) ;
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook app listening on port http://localhost:${port}`)
})
