const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const config = {
    'BOT_TOKEN': '',
    'BOT_OWNER': '',
    'NOTICE_TXT': ''
};

client.login(config.BOT_TOKEN);
