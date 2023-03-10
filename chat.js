const config =  require("./config");
organization = config.openapi.organization;
apiKey = config.openapi.apiKey;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: organization,
    apiKey: apiKey
});
const openai = new OpenAIApi(configuration);

function chat(request,response){
    result = "";
    const params = request.query;
    massage = params.message;
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": massage}]
    }).then((resp) => {
        // console.log(resp.data);
         var choices = resp.data.choices;
         for(var i = 0; i < choices.length; i++){
             choice = choices[i];
             data =  choice.message.content;
             result = "\n" + data;
         }
         console.log(result);
         response.send(result);
     });
}

module.exports = { chat };

