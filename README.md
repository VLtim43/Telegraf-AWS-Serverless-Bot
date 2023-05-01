How setup a Telegraf bot to the AWS using Serverless

### > Create telegram bot and place the http token in the .env file 

### > Create serverless template
` serverless create --template aws-node.js --path <path> `

### > Setup AWS credetials
* Go to AWS IAM
* Add user
* Add admin policy
* setup Acess keys
* run ` serverless config credentials -provider aws --key=<your key> --secret <your secret> `
* first deploy ` serverless deploy ` 


### > setup the handler hook
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
