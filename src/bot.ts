import TelegramBot = require("node-telegram-bot-api");
import Binance, { DailyStatsResult } from 'binance-api-node';
import ENV from "./config";

const bot = new TelegramBot(ENV.BOT_TOKEN, { polling: true });

const client = Binance()

// bot.onText(/\/init/, async (msg) => {
//     console.log(msg);
//     bot.sendMessage(msg.chat.id, 
//         "Hello crypto man :).\nThanks for using me.\nNow i will try to connect to binance api...");
//     //anything
//     console.log(await client.prices({ symbol: 'BTCBUSD' }))
//     console.log(await client.avgPrice({ symbol: 'BTCBUSD' }))

// });

bot.onText(/\/test/, async (msg) => {
    console.log(msg);
    bot.sendMessage(msg.chat.id,
        "\nI will try to connect to binance api...");
    //anything
    if (await client.ping()) {
        bot.sendMessage(msg.chat.id,
            "\nEverything looks good :)");
    } else {
        bot.sendMessage(msg.chat.id,
            "\nI can't connect :(");
    }
    console.log(await client.ping())
});

bot.onText(/\/tothemoon/, async (msg) => {
    const changePercent = 10;
    //anything
    const dailyStats = await client.dailyStats() as DailyStatsResult[];
    dailyStats.map(ds => {
        if (ds.symbol.search('BUSD') !== -1) {
            if (parseFloat(ds.priceChangePercent) > changePercent) {
                console.log(ds);
                const alarmIcon = '🚨'.repeat(parseInt(ds.priceChangePercent));
                const msgToSend = 
                `*Symbol ${ds.symbol}*\n${alarmIcon}\nPrice \$${ds.lastPrice}\nQuantity ${ds.lastQty}\nPrice change percent ${ds.priceChangePercent}%`
                console.log('msgToSend', msgToSend);
                
                bot.sendMessage(msg.chat.id, msgToSend, { parse_mode: "Markdown" })
            }
        }
    })
});

bot.onText(/\/help/, async (msg) => {
    bot.sendMessage(msg.chat.id,
        "\/help Show available commands.\n\/test Test connectivity.\n\/tothemoon Showing coins on the moon!");
});

export default bot;