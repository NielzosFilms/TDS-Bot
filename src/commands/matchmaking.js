const {bot, prefix, db} = require("../tds_bot");
const stringTable = require("string-table");

bot.on("message", (msg) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	const args = msg.content.slice(prefix.length).trim().split(" ");
	const command = args.shift().toLowerCase();

	if (command === "1v1") {
		if (args.length > 2) {
			const player1 = args[Math.floor(Math.random() * args.length)];
			args.splice(args.indexOf(player1), 1);
			const player2 = args[Math.floor(Math.random() * args.length)];
			msg.channel.send(`${player1} vs ${player2}`);
		} else {
			msg.reply("Please at least 3 people.");
		}
	}

	if (command === "game") {
		const sql = "SELECT name FROM games ORDER BY RAND() LIMIT 1";
		db.query(sql, (err, res) => {
			if (err) throw err;
			msg.channel.send(res[0].name);
		});
	}
});
