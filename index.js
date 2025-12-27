const { post } = require('mongoose');
const connectToMongo= require('./db')
connectToMongo();
const express = require('express')

const app = express()
const port = 5000

app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});

app.use(express.json())

app.post('/', (req, res) => {
  res.send("saad rao")
});

 

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})