require('dotenv').config();

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const telegram_token = process.env.telegram_token
const telegram_chatid = process.env.telegram_chatid
const client = require('twilio')(accountSid, authToken);
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(telegram_token, { polling: false });
const sandboxNumber = process.env.sandboxNumber; // Twilio sandbox number
const recipientNumber = process.env.recipientNumber; // Include the country code without any leading zeros or special characters

function whatsapp(message){
client.messages
  .create({
     from: `whatsapp:${sandboxNumber}`,
     body: message,
     to: `whatsapp:${recipientNumber}`
   })
  .then(message => console.log(`Message sent: ${message.sid}`))
  .catch(error => console.error('Error sending message:', error));

}

function telegram(message){
  bot.sendMessage(telegram_chatid, message)
}

module.exports = {whatsapp, telegram};