module.exports = {
	name: 'blacklist',
	description: 'blacklist!',
	execute(msg, args) {
        if (args.length != 1) {
            msg.reply('Somente uma tag por vez!')
            return
        }
        const fs =  require('fs');
        fs.appendFile(`./blacklist/${msg.guild.id}.txt`, ` ${args}`, 'utf8', (err) =>{
            if (err) { 
                console.log(err)
            } else { 
                msg.reply(`A tag ${args} foi removida do meu banco de dados!`)
            }
        })
	},
};
