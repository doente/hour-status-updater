const { token, personalization } = require("../config.json");
const axios = require("axios");
const moment = require("moment");

axios.get('https://discord.com/api/v9/users/@me/settings', 
    { headers: { Authorization: token } }).then(data => {
    
    moment.locale(data.data.locale);
    let oldHour = moment().format("hh:mm A")
    updateStatus(oldHour + ` - ${personalization.description}`, `${personalization.emoji}`)

    setInterval(() => {
    const currentHour = moment().format("hh:mm A")
        if (oldHour != currentHour) {
            updateStatus(currentHour + ` - ${personalization.description}`, `${personalization.emoji}`)
            oldHour = moment().format("hh:mm A")
        }
    }, 100)

    function updateStatus(text) {
        axios.patch("https://discord.com/api/v9/users/@me", 
        {  bio: text }, 
        { headers: { 
            Authorization: token 
        } 
    })
   }
})

