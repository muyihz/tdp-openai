const express = require("express");
const chat = require("./controller/chat");
const image = require("./controller/imageCreate");
const app = express();

app.get("/chat",chat.chat);
app.get("/image",image.createIamge);
app.use(express.static('./public'));
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});


