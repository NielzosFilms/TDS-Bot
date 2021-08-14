const {bot, prefix, db} = require("../tds_bot");

const regex = /xd/;

// bot.on("message", (msg) => {
// 	const match = msg.toString().toLowerCase().match(regex);
// 	if (match) {
// 		const checkExists = `SELECT * FROM xd_count WHERE discordId = '${msg.author.id}'`;
// 		db.query(checkExists, (err, res) => {
// 			if (res[0]) {
// 				const increment = `UPDATE xd_count SET count = count + 1 WHERE discordId = '${msg.author.id}'`;
// 				db.query(increment);
// 			} else {
// 				const insert = `INSERT INTO xd_count (discordId, count) VALUES ('${msg.author.id}', '1')`;
// 				db.query(insert);
// 			}
// 		});
// 	}

// 	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
// 	const args = msg.content.slice(prefix.length).trim().split(" ");
// 	const command = args.shift().toLowerCase();

// 	if (command === "xdcount") {
// 		const sql =
// 			"SELECT * FROM xd_count WHERE discordId != '552157141155446805'";
// 		db.query(sql, (err, res) => {
// 			if (err) throw err;
// 			let ret = "";
// 			res.forEach((row) => {
// 				ret += `<@${row.discordId}> has said XD ${row.count} times\n`;
// 			});
// 			msg.channel.send(ret);
// 		});

// 		const sql_total =
// 			"SELECT SUM(count) FROM xd_count WHERE discordId != '552157141155446805'";
// 		db.query(sql_total, (err, res) => {
// 			msg.channel.send(
// 				`XD has been said a total of ${res[0]["SUM(count)"]} times`
// 			);
// 		});
// 	}
// });
