//https://api.imgflip.com/get_memes
const {bot, prefix, db} = require("../tds_bot");
const stringTable = require("string-table");
const Discord = require("discord.js");
const fetch = require("node-fetch");

const memeApiUrl = "https://meme-api.herokuapp.com/gimme";
const jokeApiUrl = "https://api.chucknorris.io/jokes/random";

bot.on("message", (msg) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	const args = msg.content.slice(prefix.length).trim().split(" ");
	const command = args.shift().toLowerCase();

	if (command === "meme") {
		fetch(memeApiUrl)
			.then((res) => res.json())
			.then((data) =>
				msg.channel.send(
					new Discord.MessageEmbed()
						.setColor("#21c4ff")
						.setTitle(data.title)
						.setURL(data.postLink)
						.setAuthor(data.author)
						.setImage(data.url)
						.setFooter(
							`Subreddit: ${data.subreddit}\nUpvotes: ${data.ups}`
						)
				)
			);
	}

	if (command === "joke") {
		fetch(jokeApiUrl)
			.then((res) => res.json())
			.then((data) => msg.channel.send(data.value));
	}
});
