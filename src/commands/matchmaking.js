const { bot, prefix } = require("../tds_bot");

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
});
