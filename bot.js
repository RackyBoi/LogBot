const { 
    BOT,
    TOKEN 
} = require("./setup");

const { 
    message,
    ready,
} = require("./middlewares");

BOT.login(TOKEN);

BOT.on('ready', ready);

BOT.on('message', message);