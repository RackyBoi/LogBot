import axiosRequest from '../utils/axiosRequest'

import type { Message } from "discord.js"
import type { e621 } from '../interfaces/post'

function selectPost(posts: Array<e621.Post>): e621.Post {
  
  return posts[Math.floor(Math.random() * (posts.length - 1))]
}

function sendEmbed(message: Message, post: e621.Post){
  const {
    id,
    file: {
      url
    },
    description,
    tags: {
      artist,
      general,
    },
    score: {
      total
    }
  } = post

  const {
    author: {
      username
    },
    content,
  } = message


  message.channel.send({
    embed: {
      color: 3447003,
      author: {
        name: username
      },
      title: content.slice(5),
      url: `https://e621.net/posts${id}`,
      image: { url },
      description: description.length > 100 ? `${post.description.slice(0, 100)}...` : description,
      fields: [
        {
          name: 'Artistas',
          value: artist.join(' ')
        },
        {
          name: 'Score',
          value: total,
          inline: true,
        }, 
        {
          name: 'Marcadores',
          value: general.length > 25 ? `${general.slice(0, 25).join(' ')}...` : general.join(' ')
        }
      ]
    }
  });
}

async function yiff(args: Array<string>, message : Message) {
  const response = await axiosRequest({
    url: `https://e621.net/posts.json?limit=50&tags=${args.join('+')}`,
    method: 'GET',
    headers: {
      'User-Agent': 'Discord Bot made by user Arekki'
    },
    timeout: 3000
  })

  switch(response.status) {
    case 200: {
      sendEmbed(message, selectPost(response.data.posts))
    }
  }
}

export default {
  name: 'yiff',
  description: 'Send a random e621 post',
  execute: yiff
}