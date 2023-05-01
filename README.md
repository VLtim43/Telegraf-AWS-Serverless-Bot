How setup a Telegraf bot to the AWS using Serverless

# Create serverless template
` serverless create --template aws-node.js --path <path> `

# Setup AWS credetials
> Go to AWS IAM
> Add user
> Add admin policy
> setup Acess keys

` serverless config credentials -provider aws --key=<your key> --secret <your secret> `
` serverless deploy ` 

# edit the serverless.yml 
```  module.exports.webhook = (event, context, callback) => { 
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
};  ´´´
