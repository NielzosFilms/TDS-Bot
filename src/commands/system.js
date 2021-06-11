const { bot, prefix } = require("../tds_bot");
const Discord = require("discord.js");

const logoUrl = "https://avatars.githubusercontent.com/u/60883770?v=4";
const personImage =
    "https://media-exp1.licdn.com/dms/image/C5603AQGhvyUJGZ0AbQ/profile-displayphoto-shrink_200_200/0/1584436857242?e=1628121600&v=beta&t=OHukBb1sz7BFQxH_E0C9hn1hG7pOtMdVz_NRVnPxphY";

bot.on("message", (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        msg.reply(
            `pong (ms: ${Date.now() - msg.createdTimestamp}) :hourglass:`
        );
    }

    if (command === "author") {
        msg.channel.send(
            new Discord.MessageEmbed()
                .setColor("#21c4ff")
                .setTitle("NielzosFilms")
                .setDescription(
                    "Software developer\nJr. Application Engineer bij [Feka ICT](https://www.feka.nl/)"
                )
                .addFields(
                    {
                        name: "Github",
                        value: "[NielzosFilms](https://github.com/NielzosFilms)",
                    },
                    {
                        name: "Website",
                        value: "[NielzosFilms](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fnielzosfilms%2Enetlify%2Eapp%2F&urlhash=__GP&trk=public_profile-settings_website)",
                    },
                    {
                        name: "Youtube",
                        value: "[NielzosFilms](https://www.linkedin.com/redir/redirect?url=https%3A%2F%2Fwww%2Eyoutube%2Ecom%2Fchannel%2FUC_jDDlAiXW5tS0agiuwEmng&urlhash=TfOD&trk=public_profile-settings_website)",
                    },
                    {
                        name: "LinkedIn",
                        value: "[Niels Hazelaar](https://www.linkedin.com/in/niels-hazelaar-24790b146/)",
                    },
                    { name: "\u200B", value: "\u200B" }
                )
                .setThumbnail(personImage)
                .setImage(logoUrl)
                .setTimestamp()
        );
    }

    if (command === "help") {
        msg.channel.send(
            new Discord.MessageEmbed()
                .setColor("#21c4ff")
                .setTitle("Help - Commands")
                .setAuthor(
                    "NielzosFilms",
                    logoUrl,
                    "https://github.com/NielzosFilms"
                )
                .addFields(
                    {
                        name: `${prefix}help`,
                        value: "Show all commands",
                    },
                    {
                        name: `${prefix}author`,
                        value: "Show the author of this bot",
                    },
                    {
                        name: `${prefix}ping`,
                        value: "Ping the bot (shows delay in miliseconds)",
                    },
                    {
                        name: `${prefix}1v1 \`name1 name2 name3\``,
                        value: "Gives a matchup between two people",
                    },
                    {
                        name: `${prefix}schedule \`name\``,
                        value: "Gives a matchup between two people",
                    }
                )
                .setTimestamp()
        );
    }

    if (command === "schedule") {
        if (args[0]) {
            if (args[0] === "NielzosFilms") {
                msg.channel.send(
                    new Discord.MessageEmbed()
                        .setColor("#21c4ff")
                        .setTitle("Schedule NielzosFilms")
                        .setAuthor(
                            "NielzosFilms",
                            logoUrl,
                            "https://github.com/NielzosFilms"
                        )
                        .addFields(
                            {
                                name: "Monday",
                                value: "ROC for 2 hours",
                            },
                            {
                                name: "Tuesday",
                                value: "Bit-Academy 09:30 - 16:00 (Home)",
                            },
                            {
                                name: "Wednesday",
                                value: "Bit-Academy 09:30 - 16:00 (Amsterdam)",
                            },
                            {
                                name: "Thursday",
                                value: "Feka ICT 8:15 - 17:15",
                            },
                            {
                                name: "Friday",
                                value: "Bit-Acadmey 09:30 - 16:00 {Amsterdam)",
                            }
                        )
                        .setTimestamp()
                );
            }
        } else {
            msg.reply("Please provide a name");
        }
    }
});
