const express = require("express");
const chat = require("./chat");
const image = require("./imageCreate");
const app = express();

app.get("/chat",chat.chat);
app.get("/image",image.createIamge);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});


