const { token } = require("./config.json")
const axios = require("axios");
const moment = require("moment");

moment.locale('pt-BR')

let oldHour = moment().format("hh:mm A")
updateStatus(oldHour, '🌃')

setInterval(() => {
    const currentHour = moment().format("hh:mm A")
    if (oldHour != currentHour) {
        updateStatus(currentHour, '🌃')
        oldHour = moment().format("hh:mm A")
    }
}, 100)

function updateStatus(text, emoji_name) {
    axios.patch('https://discord.com/api/v8/users/@me/settings', { "custom_status": { text, emoji_name } }, { headers: { Authorization: token } })
}