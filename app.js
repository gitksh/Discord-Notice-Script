const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const config = {
    'BOT_TOKEN': '',
    'BOT_OWNER': '',
    'NOTICE_TXT': ''
};

client.login(config.BOT_TOKEN).then(async () => {
    try {
        const noticeTxt = await fs.readFileSync(config.NOTICE_TXT);

        if (process.argv[2] !== 'release') {
            let user = await client.users.fetch(config.BOT_OWNER, false, true);
            await user.send(noticeTxt.toString());
            console.log('DONE');
            process.exit();
        } else {
            const guilds = await client.guilds.cache.map(guild => guild.id);
            let owners = [];

            for (const guild of guilds) {
                let ownerId = (await client.guilds.fetch(guild, false, true)).ownerID;
                if (!owners.includes(ownerId)) {
                    await owners.push(ownerId);
                }
            }

            for (const owner of owners) {
                await (await client.users.fetch(owner, false, true)).send(noticeTxt.toString());
            }

            console.log('DONE');
            process.exit();
        }
    } catch (e) {
        console.error(e);
        process.exit();
    }
});