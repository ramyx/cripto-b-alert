import TelegramBot from "node-telegram-bot-api";
import Binance from 'binance-api-node';

const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(BOT_TOKEN);

bot.on('message', (msg) => {
    console.log(msg);
    bot.sendMessage(msg.chat.id,"Hello dear user");
    //anything
    
});