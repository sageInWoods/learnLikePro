const connectToMongo=require('./db');
const express = require('express')
var cors =require('cors')
connectToMongo();
//express boilercode 

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// using middleware to access req.body
// app.use(express.json())


// available routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})