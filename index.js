const TelegramBot = require('node-telegram-bot-api');

const token="5925340289:AAEwavcHvfhFgmOVBavZ4w9kLTpMmf6TKqI";

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