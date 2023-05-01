

module.exports.setCommands = (bot) => {
  //randomly chooses one greeting
  bot.start((ctx) => {
    return ctx.reply("working fromt the aws!");
  });


};

/* let images = [];
function scheduleImagesToChannel(channelId, images, interval) {
    let counter = 0;
    const timerId = setInterval(() => {
      if (counter < images.length) {
        bot.telegram.sendPhoto(channelId, images[counter]);
        counter++;
      } else {
        clearInterval(timerId);
      }
    }, interval);
  }

module.exports.setCommands = (bot) => {
  bot.start((ctx) => {
    return ctx.reply("working");
  });

  bot.on('photo', (ctx) => {
    const photoId = ctx.message.photo[0].file_id;
    images.push(photoId);
    ctx.reply('Image added to schedule.');
  });
  
  bot.command('schedule', (ctx) => {
    const channelId = '@your_channel_username';
    const interval = 86400000; // 24 hours in milliseconds
    scheduleImagesToChannel(channelId, images, interval);
    ctx.reply('Images scheduled to be posted to channel.');
  });
  
}; */