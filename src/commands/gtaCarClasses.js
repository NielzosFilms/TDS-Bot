const {bot, prefix, databaseConfig} = require("../tds_bot");
const Discord = require("discord.js");
const Database = require("../Database");
const logoUrl = "https://avatars.githubusercontent.com/u/60883770?v=4";

const carTypes = ["sports", "sports_classic", "supers", "off_road"];

const sqlOrder = `case when rank = 'S' then 1
    when rank = 'A' then 2
    when rank = 'B' then 3
    when rank = 'C' then 4
    when rank = 'D' then 5
    else 6
    end
`;

/**
 *
 * @param {string} title
 */
function formatTitle(title) {
	const split = title.split("_");
	let ret = "";
	for (const word of split) {
		ret += word.charAt(0).toUpperCase() + word.slice(1) + " ";
	}
	return ret;
}

bot.on("message", async (msg) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	const args = msg.content.slice(prefix.length).trim().split(" ");
	const command = args.shift().toLowerCase();

	if (command === "gta-car") {
		const db = await new Database(databaseConfig);
		try {
			if (args.length < 2) throw "Not enough arguments";
			let carType = args[0].toLowerCase();
			const carCommand = args[1].toLowerCase();

			if (carType === "random") {
				carType = carTypes[Math.floor(Math.random() * carTypes.length)];
			} else {
				if (carTypes.indexOf(carType) === -1)
					throw `Car type \`${carType}\` does not exist`;
			}

			let sql = "";

			if (carCommand === "ls") {
				sql = `SELECT name,rank FROM ${carType} ORDER BY ${sqlOrder} ASC`;
				if (args[2]) {
					const subclass = args[2].toUpperCase();
					sql = `SELECT rank FROM ${carType} GROUP BY rank ORDER BY ${sqlOrder} ASC`;
					const subclassesResult = await db
						.query(sql, null)
						.catch((err) => {
							console.log(err);
							throw err;
						});
					const subclasses = [];
					for (const row of subclassesResult) {
						subclasses.push(row.rank);
					}
					if (subclasses.indexOf(subclass) === -1) {
						throw `Subclass \`${subclass}\` does not exist on \`${carType}\``;
					} else {
						sql = `SELECT name FROM ${carType} WHERE rank = '${subclass}' ORDER BY name ASC`;
						const carsResult = await db
							.query(sql, null)
							.catch((err) => {
								console.log(err);
								throw err;
							});
						console.log(carsResult);
						const cars = [];
						for (const row of carsResult) {
							cars.push(row.name);
						}
						msg.channel.send(
							new Discord.MessageEmbed()
								.setColor("#21c4ff")
								.setTitle(
									formatTitle(carType) + "- " + subclass
								)
								.setAuthor(
									"NielzosFilms",
									logoUrl,
									"https://github.com/NielzosFilms"
								)
								.addFields({
									name: cars.length > 1 ? "cars" : "car",
									value: cars.join("\n"),
								})
						);
					}
				} else {
					const listResult = await db
						.query(sql, null)
						.catch((err) => {
							console.log(err);
							throw err;
						});
					const cars = {};
					for (const row of listResult) {
						if (!cars[row.rank]) cars[row.rank] = [];
						cars[row.rank].push(row.name);
					}
					msg.channel.send(
						new Discord.MessageEmbed()
							.setColor("#21c4ff")
							.setTitle(formatTitle(carType))
							.setAuthor(
								"NielzosFilms",
								logoUrl,
								"https://github.com/NielzosFilms"
							)
							.addFields(
								Object.keys(cars).map((subclass) => {
									return {
										name: subclass,
										value: cars[subclass].join("\n"),
									};
								})
							)
					);
				}
			} else if (carCommand === "subclasses") {
				sql = `SELECT rank,COUNT(rank) FROM ${carType} GROUP BY rank ORDER BY ${sqlOrder} ASC`;
				const ranksResult = await db.query(sql, null).catch((err) => {
					console.log(err);
					throw err;
				});
				const subclasses = {};
				for (const row of ranksResult) {
					subclasses[row.rank] = row["COUNT(rank)"];
				}
				msg.channel.send(
					new Discord.MessageEmbed()
						.setColor("#21c4ff")
						.setTitle(formatTitle(carType) + "- subclasses")
						.setAuthor(
							"NielzosFilms",
							logoUrl,
							"https://github.com/NielzosFilms"
						)
						.addFields(
							Object.keys(subclasses).map((subclass) => {
								return {
									name: subclass,
									value:
										subclasses[subclass] +
										(subclasses[subclass] > 1
											? " cars"
											: " car"),
								};
							})
						)
				);
			} else if (carCommand === "rand-subclass") {
				sql = `SELECT rank FROM ${carType} GROUP BY rank ORDER BY ${sqlOrder} ASC`;
				const ranksResult = await db.query(sql, null).catch((err) => {
					console.log(err);
					throw err;
				});
				const subclasses = [];
				for (const row of ranksResult) {
					subclasses.push(row.rank);
				}
				const randSubclass =
					subclasses[Math.floor(Math.random() * subclasses.length)];
				sql = `SELECT name FROM ${carType} WHERE rank = '${randSubclass}' ORDER BY name ASC`;
				const carsResult = await db.query(sql, null).catch((err) => {
					console.log(err);
					throw err;
				});
				const cars = [];
				for (const row of carsResult) {
					cars.push(row.name);
				}
				msg.channel.send(
					new Discord.MessageEmbed()
						.setColor("#21c4ff")
						.setTitle(formatTitle(carType) + "- " + randSubclass)
						.setAuthor(
							"NielzosFilms",
							logoUrl,
							"https://github.com/NielzosFilms"
						)
						.addFields({
							name: cars.length > 1 ? "cars" : "car",
							value: cars.join("\n"),
						})
				);
			} else {
				throw `Unknown command: \`${carCommand}\``;
			}
		} catch (err) {
			msg.channel.send(`gta-car error: ${err}`);
			msg.channel.send(
				new Discord.MessageEmbed()
					.setColor("#21c4ff")
					.setTitle("GTA car help")
					.setAuthor(
						"NielzosFilms",
						logoUrl,
						"https://github.com/NielzosFilms"
					)
					.addFields(
						{
							name: `Command usage`,
							value: `\`${prefix}gta-car <car_type> <command>\``,
						},
						{
							name: "Car types",
							value: "`sports`\n`sports_classic`\n`supers`\n`off_road`\n`random`",
						},
						{
							name: "Commands",
							value: "`ls` list all cars\n`subclasses` list all subclasses\n`rand-subclass` list all cars from a random subclass\n`ls <subclass>` list all cars from the given subclass",
						}
					)
			);
		}
		db.close();
	}
});
