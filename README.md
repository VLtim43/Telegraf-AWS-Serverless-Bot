How setup a Telegraf bot to the AWS using Serverless

### > Create telegram bot and place the bot token in the .env file 

### > Create serverless template
` serverless create --template aws-node.js --path <path> `

### > Setup AWS credetials
* Go to AWS IAM
* Add user
* Add admin policy
* setup Acess keys
* run ` serverless config credentials -provider aws --key=<your key> --secret <your secret> `
* first deploy ` serverless deploy ` 


### > setup the handler.js hook
```
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

const { Telegraf } = require("telegraf");
const { setCommands } = require("./src/setCommands"); 

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
```

### > setup the  commands in src/setComands.js
```
module.exports.setCommands = (bot) => {
  //randomly chooses one greeting
  bot.start((ctx) => {
    return ctx.reply("working fromt the aws!");
  });
};
```

### > Edit the serverless.yml 
```
service: <your service name>
provider:
  name: aws
  runtime: nodejs12.x
  region: <your aws region>


functions:
  webhook:
    handler: handler.webhook 
    events:
      - http:
          path: webhook
          method: post

```

### > Webhook setup
* deploy ` serverless deploy ` again
It will pack all your files into .zip archive and upload to AWS, then it will create AWS API Gateway and return API endpoint. You will receive something like this:
` POST - https://asd0asd9.execute-api.us-east-1.amazonaws.com/dev/your-custom-url `

* execute this request
```
curl --request POST --url https://api.telegram.org/bot<Your bot TOKEN>/setWebhook --header 'content-type: application/json' --data '{"url": "<your API endpoint url"}'

```

if eberything worked then you will recieve this

```
{
  "ok": true,
  "result": true,
  "description": "Webhook was set"
}
```
* last deploy ` serverless deploy ` 
Now it’s live! Congratulations.
 

