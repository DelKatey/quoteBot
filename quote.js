var Discord = require("discord.js");
var bot = new Discord.Client();


bot.on("message", message => {
    if (message.content.startsWith("!q ")) {
        console.log("----quote----");
        var id = message.content.split(" ")[1];
        message.channel.fetchMessage(id)
            .then(qm => {
            console.log(qm);
            embedQuote(bot, message, qm);
        })
            .catch(searchChannels(message, id));
    }
});

bot.on('ready', () => {
    console.log('I am ready!');
});

bot.login("MjU5OTMzMjI3Njc2OTkxNDg4.CzfBhw.EvDM1NTNc982Zj9zTE_UrvoabJs");


function searchChannels(msg, id){
    var channels = msg.guild.channels.array();
    console.log(channels);
    console.log(channels[0]);
    console.log(channels[1]);
    console.log(channels[2]);
    for(var i = 0; i < channels.length; i++){
        if(channels[i].type != "text"){
            continue;
        }
        channels[i].fetchMessage(id)
            .then(qm => {
            console.log(qm);
            embedQuote(bot, msg, qm);
        })
            .catch();
    }
}


function embedQuote(client, original, msg){
    //var fields = [];
    
    var user = msg.author;
    var guildUser = original.guild.members.filter(m => m.user.username === user.username);

    embed = {
        color: parseInt("0x" + guildUser.array()[0].highestRole.hexColor.replace("#","")),
        /*author: {
            name: user.username + " said:",
            icon_url: user.avatarURL
        },*/
        title: "",
        url: "", 
        description: msg.content + "\n** **",
        /*fields: [
            {name: "**͘ **",
            value: "[](http://i.imgur.com/thIoLvC.png)"}
        ],*/
        //image: {},
        timestamp: new Date(msg.createdTimestamp).toISOString(),
        footer: {
            icon_url: msg.author.avatarURL,
            text: '©' + msg.author.username
        }
    };
    
    console.log(embed);

    original.channel.sendMessage('', { embed }).then().catch(console.error);
}