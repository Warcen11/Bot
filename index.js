const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config({ path: './token.env' });
const axios = require('axios').default
const token=process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.setMyCommands(
    [
        {command: '/start', description: 'Приветствие'},
    ]
)

bot.on('message', async msg => {
    chatId = msg.chat.id
    if(msg.text == '/start'){
        return bot.sendMessage(chatId, 'Привет');
    }
    if(msg.text == '/trips'){
        return getTripList().then(tripList => {
            bot.sendMessage(chatId, 'Ваши поездки :', tripList)
        })
    return bot.sendMessage(chatId, 'Простите, но я не понял что вы сказали')
    }
})


const express = require('express');
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    // credentials: true
}))

app.post('/create-trip', function (req) {
    bot.sendMessage(660411344, `Поездка создана!
http://localhost:5173/trip?_id=${req.query._id}`)
})
app.post('/create-user', function (req){
    bot.sendMessage(660411344, `Зарегистрирован пользователь:
${req.query._fullname}
${req.query._email}`)
})

try {
    app.listen(4089, () => {
        console.log(`Server is running on http://localhost:4089`);
    })
} catch (error) {
    console.log('у тебя ошибка');
}
