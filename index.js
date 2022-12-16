const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config({ path: './token.env' });

const token=process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.setMyCommands(
    [
        {command: '/start', description: 'Приветствие'},
    ]
)

bot.on('message', async msg => {
    const chatId = msg.chat.id;
    if(msg.text == '/start'){
        return bot.sendMessage(chatId, 'Привет, я бот созданный для проекта "Хочу в поездку"');
    }
    return bot.sendMessage(chatId, 'Простите, но я не понял что вы сказали')
  });