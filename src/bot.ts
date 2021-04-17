import TelegramBot from "node-telegram-bot-api";
import Binance from 'binance-api-node';
import ENV from "./config";

const bot = new TelegramBot(ENV.BOT_TOKEN, { polling: true });

const client = Binance()

bot.onText(/\/init/, async (msg) => {
    console.log(msg);
    bot.sendMessage(msg.chat.id, 
        "Hello crypto man :).\nThanks for using me.\nNow i will try to connect to binance api...");
    //anything
    console.log(await client.prices({ symbol: 'BTCBUSD' }))

});

bot.onText(/\/help/, async (msg) => {
    bot.sendMessage(msg.chat.id, 
        "\/help Show available commands.\n\/init Initialize and configure the bot.");
});

export default bot;