const {
    Message
} = require('discord.js')

const { 
    PREFIX,
    BOT
} = require('../setup');

const { 
    IgnorableError,
    CommandNotFound
} = require('../utils/index')


/**
 * @typedef {Object} ParsedMessage
 * @property {String} command
 * @property {Array<String>} args
 */

/**
 * @param {Message} msg 
 * @throws {IgnorableError}
 * @returns {ParsedMessage}
 */
function handleMessage(msg) {
    if(msg.author.BOT) throw new IgnorableError()
    if(!msg.content.startsWith(PREFIX)) throw new IgnorableError()

    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase().substring(1);

    return {
        args,
        command
    }
}

/**
 * @param {String} command
 * @param {Array<String>} args
 * @param {Message} msg
 * @throws {CommandNotFound}
 */
function handleCommand(command, args, msg) {
    console.info(`${msg.author.username} invoked command: ${command} ${args}`);

    if (!BOT.commands.has(command)) throw new CommandNotFound();

    BOT.commands.get(command).execute(msg, args);
}

/**
 * @param {Error} error 
 * @param {Message} msg 
 */
function handleExceptions(error, msg) {
    switch(error.name) {
        case 'IgnorableError':
            break
        case 'CommandNotFound': 
            msg.reply('meu pai não me ensinou a fazer isso.');
            break
        default:
            msg.channel.send('Ouch, tropecei em alguns bits!');
            break
    }
}

/**
 * 
 * @param {Message} msg 
 */
function message(msg) {
    try {
        const { 
            args,
            command,
        } = handleMessage(msg);

        handleCommand(command, args, msg);
    } catch (error) {
        handleExceptions(error, msg);
    }
}

module.exports = message;
