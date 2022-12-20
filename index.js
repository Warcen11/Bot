const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config({ path: './token.env' });
const axios = require('axios').default
const token=process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

axios.get('http://localhost:3030/trips/get-all').then(response =>{
    let inline_keyboard = []
    for(let i = 0; i<response.data.length; i++){
        inline_keyboard[i] = [{text: response.data[i].name, callback_data: response.data[i]._id}]
    }
    tripInfo = {
        reply_markup: JSON.stringify({
            inline_keyboard
        })
    }
})



bot.setMyCommands(
    [
        {command: '/start', description: 'Приветствие'},
        {command: '/trips', description: 'Узнать о своих поездках'},
    ]
)

bot.on('message', async msg => {
    chatId = msg.chat.id
    if(msg.text == '/start'){
        return bot.sendMessage(chatId, 'Привет, я буду отправлять сюда информацию о ваших поездках');
    }
    if(msg.text == '/trips'){
        return bot.sendMessage(chatId, 'Ваши поездки:', tripInfo)
    return bot.sendMessage(chatId, 'Простите, но я не понял что вы сказали')
    }
})