const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config({ path: './token.env' });
const axios = require('axios').default
const token=process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

const getTripList = async () => {
    await axios.get('http://localhost:3030/trips/get-all').then(async response =>{
        let inline_keyboard = []
        await response.data.forEach((item) =>{
            inline_keyboard.push([{text: item.name, callback_data: item._id}])
        })
        tripList = {
            reply_markup: JSON.stringify({
                inline_keyboard
            })
        }
    })
    return tripList
}

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
        return getTripList().then(tripList => {
            bot.sendMessage(chatId, 'Ваши поездки :', tripList)
        })
    return bot.sendMessage(chatId, 'Простите, но я не понял что вы сказали')
    }
})
bot.on('callback_query', async msg => {
    chatId = msg.message.chat.id
    console.log(msg)
})