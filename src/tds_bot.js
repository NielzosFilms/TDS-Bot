require("dotenv").config();
const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const bot = new Discord.Client();

const MODULES = ["commands"];

const prefix = ".";

const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});
con.connect((err) => {
	if (err) throw err;
	console.log("Connected to database!");
});

bot.login(process.env.TOKEN);

bot.on("ready", () => {
	bot.user.setPresence({
		activity: {name: `"${prefix}help" for commands`},
		status: "online",
	});
	console.log(
		`Logged in as ${bot.user.tag}!\n${bot.user.tag} is listening :)`
	);

	MODULES.forEach((module) => {
		fs.readdir(path.join(__dirname, module), (err, files) => {
			files.forEach((filename) => {
				if (
					fs
						.lstatSync(path.join(__dirname, module, filename))
						.isFile()
				) {
					require(path.join(__dirname, module, filename));
				}
			});
		});
	});
});

module.exports.bot = bot;
module.exports.prefix = prefix;
module.exports.db = con;
