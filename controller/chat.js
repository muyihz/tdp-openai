const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/app.talkdb');
const config =  require("../config");
organization = config.openapi.organization;
apiKey = config.openapi.apiKey;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: organization,
    apiKey: apiKey
});
const openai = new OpenAIApi(configuration);

function chat(request,response){
    const params = request.body;
    var req_message=params.message;
    var message=params.message;
    var talk_id = params.talk_id;
    console.log("接受到请求：/chat ,talk_id :" +talk_id+ " message :" + message + "=============================================================");
    db.all("select message_id,talk_id,type,content,time from message where talk_id = ? order by message_id desc limit 10",[talk_id],(err,rows) => {
        if(err){
            console.log(talk_id+ "  " + message);
            console.log(err);
            return;
        }
        var histroy = "";
        if(rows != null && rows.length > 0){
            for(var i = rows.length-1; i >=0  ; i--){
                var row = rows[i];
                var content = row.content;
                histroy = histroy + content + "\n\n";
                console.log(row.message_id + "-" + row.content);
            }
            message = histroy + message;
        }
        console.log("ask:" + message);
        
        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": message}]
        }).then((resp) => {
            //console.log(resp);
            var choices = resp.data.choices;
            var choice = choices[0];
            var data =  choice.message.content
            console.log("answer:" + data);
            var date = new Date();
            db.run("insert into message (talk_id,type,content,time) values (?,?,?,?)",[talk_id,'ask',req_message,date]);
            db.run("insert into message (talk_id,type,content,time) values (?,?,?,?)",[talk_id,'answer',data,date]);
            response.send(data);
        });
        
    });

}

module.exports = { chat };

