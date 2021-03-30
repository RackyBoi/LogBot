module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(msg, args) {
		latency = parseInt(msg.createdTimestamp - Date.now())
		msg.channel.send(`Pong ! ${latency} ms`);
	},
};
