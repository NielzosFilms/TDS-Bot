const {bot, prefix, databaseConfig} = require("../tds_bot");
const Database = require("../Database");

bot.on("message", async (msg) => {
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
		const db = await new Database(databaseConfig);
		const sql = "SELECT name FROM games ORDER BY RAND() LIMIT 1";
		const result = await db
			.query(sql, null)
			.catch((err) => console.log(err));
		msg.channel.send(result[0].name);
		await db.close();
	}
});
