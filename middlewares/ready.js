const { BOT } = require("../setup");

module.exports = function ready() {
    console.info(`Logged in as ${BOT.user.tag}!`);
};