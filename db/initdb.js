var sqlite3 = require('sqlite3');
function initDB(){
    var database= new sqlite3.Database("app.talkdb");
    database.run("create table if not exists user( user_id integer primary key autoincrement,user_name text,user_pwd text,username text)",(err,data) =>{
        if(err != null){
            console.log("创建user表失败。原因:"+err);
        } 
    });
    database.run("create table if not exists user( user_id integer primary key autoincrement,user_name text,user_pwd text,username text)",(err,data) =>{
        if(err != null){
            console.log("创建[user]表失败。原因:"+err);
        } 
    });

    database.run("create table if not exists user_talk(user_id integer,talk_id integer,primary key (user_id,talk_id))",(err,data) =>{
        if(err != null){
            console.log("创建[user_talk]表失败。原因:"+err);
        } 
    });
    // database.run("create table if not exists message(message_id integer primary key autoincrement,chat_id text,talk_id integer,role text,talker text,content text, time text)",(err,data) =>{
    //     if(err != null){
    //         console.log("创建[message]表失败。原因:"+err);
    //     } 
    // });
    database.run("create table if not exists message(message_id integer primary key autoincrement,talk_id text,type text,content text, time text)",(err,data) =>{
        if(err != null){
            console.log("创建[message]表失败。原因:"+err);
        } 
    });
}
initDB();