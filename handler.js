require("dotenv").config();
const { Telegraf } = require("telegraf");
const { setCommands } = require("./src/setCommands");
const bot = new Telegraf(process.env.BOT_TOKEN);


 module.exports.webhook = (event, context, callback) => {
  const body = JSON.parse(event.body);
  bot.handleUpdate(body);
  setCommands(bot);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
      message: "Its working!",
    }),
  };

  return callback(null, response);
}; 


/* setCommands(bot);
bot.launch() */