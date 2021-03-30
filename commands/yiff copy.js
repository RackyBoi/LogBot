module.exports = {
	name: 'yiff',
	description: 'Yiff!',
	execute(msg, args) {
        // if (!msg.channel.nsfw){
        //     msg.reply('Esse canal não é nsfw!')
        //     return
        // }
        if (args.length > 6) {
            msg.reply('Você só pode usar 6 tags!')  
        }
        const request = require('request')
        const fs = require('fs')
        const limit = 10
        const options = {
            url: `https://e621.net/posts.json?limit=${limit}&tags=${args.join('+')}`,
            method: `get`,
            headers: {
                'User-Agent': 'Discord Bot made by user Arreki'
            },
            timeout: 5000,
            
        }
		request(options, (err, res, body) => {
            if (err) {
                console.log(err)
            }
            if (res.statusCode == 200 ) {
                posts = (JSON.parse(body)).posts
                if (posts.length != 0) {
                    fs.readFile(`./blacklist/${msg.guild.id}.txt`, {encoding: 'utf-8'}, function(err,data){
                        if (!err) {
                            blacklisted = data.split(' ');
                            i = 0
                            while (true) {
                                i++
                                if (i == 3){
                                    msg.reply('E se eu não quiser?')
                                    break
                                }
                                try {
                                    post = posts[Math.floor(Math.random()*posts.length)]
                                    if (blacklisted.some(tag => post.tags.general.indexOf(tag) > 0)) continue;
                                    msg.channel.send({embed: {
                                        color: 3447003,
                                        author: {
                                        name: msg.author.username,
                                        icon_url: msg.author.avatarURL
                                        },
                                        title: args.join(' '),
                                        url : `https://e621.net/posts/${post.id}`,
                                        image: {url: post.file.url},
                                        description: post.description.length > 100 ? ` ${post.description.slice(0,100)}...`: post.description,
                                        fields: [
                                        {
                                            name: "Artistas",
                                            value: post.tags.artist.join(' '),
                                            inline: true
                                        },
                                        {
                                            name: "Score",
                                            value: post.score.total,
                                            inline: true
                                        },
                                        {
                                            name: "Marcadores",
                                            value: post.tags.general.length > 25 ? `${post.tags.general.slice(0, 25).join(' ')} ...`: post.tags.general.join(' ')
                                        }
                                        ],
                                    }
                                    });
                                    // msg.delete()
                                    break
                                } catch (error) {
                                    console.log(error)
                                    break
                                }            
                            }           
                        } else {
                            console.log(err);
                        }
                    }); 
                } else {
                    msg.reply('Desculpe, não achei nada')
                }
            } else {
                msg.reply('Ops, o e621 está fora do ar')
            }
        })
	}
};






