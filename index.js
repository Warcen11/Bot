const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config({ path: './token.env' });

const token=process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

const chatId = msg.chat.id;

bot.setMyCommands(
    [
        {command: '/start', description: 'Приветствие'},
    ]
)

bot.on('message', async msg => {
    if(msg.text == '/start'){
        return bot.sendMessage(chatId, 'Привет, я буду отправлять сюда информацию о ваших поездках');
    }
    return bot.sendMessage(chatId, 'Простите, но я не понял что вы сказали')
  });