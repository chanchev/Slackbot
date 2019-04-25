const SlackBot = require('slackbots');
const axios = require('axios');
const memes = require("./constants")

const bot = new SlackBot({
    token: 'xoxb-593876608326-593515393287-LqTUF0Kx0EgGTjqKkT4o2MOY',
    name: 'vibeBot'
})

const messageTypes = ['meme', 'quote', 'gif' ];
const params = {
    icon_emoji: ':success-kid:'
}

// Start Handler
bot.on('start', () => {
    bot.postMessageToChannel('general', 'Have a great day!', params);
});

bot.on('err', (err) => {
    console.log(err);
})

bot.on('message', (data)=>{
    let messageType;
    
    if(data.type !== 'message'){
        return;
    }
    if(data.user){
        if(data.text.includes("<@UHFF5BK8F>")){
        messageType = messageTypes[randomSelector(messageTypes.length-1)];
        handleMessage(messageType, messageTypes);
        }
    }
});

randomSelector = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
};

handleMessage = (messageType, messageTypes) => {
    if(messageType === messageTypes[0]){
        getImage();        
    } else if (messageType === messageTypes[1]){
        getQuote();
    } else if (messageType === messageTypes[2]){
        getGif();
    }
}

getGif = () =>{

}

getImage = () => {
    let index = randomSelector(memes.memeUrls.length);
    bot.postImage('general', memes.memeUrls[index], params);
}

getQuote = () => {
    axios.get("https://qvoca-bestquotes-v1.p.rapidapi.com/quote?genre=happiness",
    {'headers': {'X-RapidAPI-Key': 'dff89d878bmsh7bef633f9d80cddp1c5c88jsn38e42936a7e6'}})
    .then(res => {
        bot.postMessageToChannel('general', res.data.message, params);
    })
    .catch(err=>{
        console.log(err);
    });
}