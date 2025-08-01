require('dotenv').config();

const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

app.get('/api/data', (req, res)=>{
    res.json({message: 'Data fetched from backend!', status: 'success'})
})

app.GET (/api/user/profile,(req,res)=>{
    res.json({
Response: {
  avatar: string,
  isProfileComplete: boolean,
}})
})

app.get('/api/search?query', (req,res)=>{
    res.json({results: ['Book A','Book B']})
})

app.GET (/api/notifications,(req,res)=>{
    res.json({Response: [{
  id: String,
  title: String,
  message: String,
  link: String,
  icon: String,
  date: ISOString,
  read: Boolean
}] })
})


PATCH /api/notifications/:id/read

app.listen(PORT,()=>{
    console.log(`server is running: ${PORT}`)
})
