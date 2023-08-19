const { log } = require('console');
const express = require('express'); //to import express
const app = express();// to call express
const http = require('http').createServer(app);

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use(express.static(__dirname +'/public'))
//  routing if any one request server the req 
// '/' home cha req alya var kay karcha kalacha code sangata
app.get('/', (req, res) => {
  res.sendFile( __dirname +'/index.html');
});


const io= require('socket.io')(http)

io.on('connection',(socket) =>{
    console.log("Connected...");

    socket.on('join', (name) => {
      socket.broadcast.emit('joined', name);
  });
    socket.on('message',(msg)=>{
        console.log(msg)
        socket.broadcast.emit('message',msg)
    })
})    