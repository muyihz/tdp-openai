//const axios = require('axios');
// const instance = axios.create({
//     // 代理配置
//     proxy: {
//       host: '127.0.0.1',
//       port: "7890"
//     },
//   });


const config =  require("../config");
organization = config.openapi.organization;
apiKey = config.openapi.apiKey;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: organization,
    apiKey: apiKey
});
const openai = new OpenAIApi(configuration);

function createIamge(request,response){
    const params = request.query;
    console.log(params);
    const message = params.message;
    openai.createImage({
        model: "image-alpha-001",
        prompt: message,
        size: "256x256",
        n: 1
    }).then((resp) => {
        var url = resp.data.data[0].url;
        console.log(url);
        const http = require('http');
        const https = require('https');
        const protocol = url.startsWith('https') ? https : http;
        protocol.get(url,res => {
            response.setHeader('Content-Type', res.headers['content-type']);
            res.pipe(response);
        }).on('error', error => {
            console.log(`Error while downloading image: ${error}`);
            res.status(500).send('Unable to download image');
          });
    })
}



module.exports = {createIamge}