module.exports = {
	name: 'avatar',
	description: 'Show user Avatar!',
	execute(msg, args) {
        msg.mentions.users.array().forEach(user => {
            msg.channel.send(user.avatarURL)
        });
	},
};
