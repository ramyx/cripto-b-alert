import TelegramBot = require("node-telegram-bot-api");
import Binance, { DailyStatsResult } from 'binance-api-node';
import ENV from "./config";

const bot = new TelegramBot(ENV.BOT_TOKEN, { polling: true });

const client = Binance()

bot.onText(/\/test/, async (msg) => {
    console.log(msg);
    bot.sendMessage(msg.chat.id,
        "\nI will try to connect to binance api...");
    if (await client.ping()) {
        bot.sendMessage(msg.chat.id,
            "\nEverything looks good :)");
    } else {
        bot.sendMessage(msg.chat.id,
            "\nI can't connect :(");
    }
    console.log(await client.ping())
});

bot.onText(/\/tothemoon (.+)/, async (msg, match) => {
    const changePercent = isNaN(parseInt(match[1])) ? 10 : parseInt(match[1]);
    const dailyStats = await client.dailyStats() as DailyStatsResult[];
    dailyStats.map(ds => {
        if (ds.symbol.search('BUSD') !== -1) {
            if (parseFloat(ds.priceChangePercent) > changePercent) {
                const alarmIcon = '🚨'.repeat(parseInt(ds.priceChangePercent));
                const msgToSend =
                    `*Symbol ${ds.symbol}*\n${alarmIcon}\nPrice \$${ds.lastPrice}\nQuantity ${ds.lastQty}\nPrice change percent ${ds.priceChangePercent}%`;
                bot.sendMessage(msg.chat.id, msgToSend, { parse_mode: "Markdown" })
            }
        }
    })
});

bot.onText(/\/help/, async (msg) => {
    bot.sendMessage(msg.chat.id,
        "\/help Show available commands.\n\/test Test connectivity.\n\/tothemoon <limit-percent> Showing coins on the moon!");
});

export default bot;