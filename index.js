const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config({ path: './token.env' });
const axios = require('axios').default
const token=process.env.TOKEN;
const mychatid=process.env.CHATID

const bot = new TelegramBot(token, {polling: true});

bot.setMyCommands(
    [
        {command: '/start', description: 'start'},
    ]
)

bot.on('message', async msg => {
    chatId = msg.chat.id
    if(msg.text == '/start'){
        return bot.sendMessage(chatId, 'Привет');
    }
})


const express = require('express');
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
}))

app.post('/create-trip', function (req) {
    bot.sendMessage(mychatid, `Поездка создана:
http://localhost:5173/trip?_id=${req.query._id}`)
})
app.post('/create-user', function (req){
    bot.sendMessage(mychatid, `Зарегистрирован пользователь:
${req.query._fullname}
${req.query._email}`)
})
app.post('/add-companion', function (req) {
    bot.sendMessage(mychatid, `Добавлен попутчик:
${req.query.name}`)
})
app.post('/add-guide', function (req) {
    bot.sendMessage(mychatid, `Добавлен элемент гида:
${req.query.name}`)
})

try {
    app.listen(4089, () => {
        console.log(`Server is running on http://localhost:4089`);
    })
} catch (error) {
    console.log(error);
}
