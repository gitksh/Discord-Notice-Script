const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const config = {
    'BOT_TOKEN': '',
    'BOT_OWNER': '',
    'NOTICE_TXT': ''
};

client.login(config.BOT_TOKEN);
client.login(config.BOT_TOKEN).then(async () => {
    try {
        const noticeTxt = await fs.readFileSync(config.NOTICE_TXT);

        if (process.argv[2] !== 'release') {
            let user = await client.users.fetch(config.BOT_OWNER, false, true);
            await user.send(noticeTxt.toString());
            console.log('DONE');
        } else {
            }
        }
    } catch (e) {
        console.error(e);
    }
});