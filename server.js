const express = require("express");

const bodyParser = require('body-parser');

const chat = require("./controller/chat");
const image = require("./controller/imageCreate");
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/chat",chat.chat);
// app.post("/chat",function(req, res) {
//     const message = req.body;
//     console.log(message.message);
//     res.send('消息已收到');
//   });
app.get("/image",image.createIamge);
app.use(express.static('./public'));


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});


