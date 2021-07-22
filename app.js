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
        let noticeTxt = await fs.readFileSync(config.NOTICE_TXT);
        if (process.argv[2] !== 'release') {
            let user = await client.users.fetch(config.BOT_OWNER, true, true);
            await user.send(noticeTxt.toString());
            console.log('DONE');
            process.exit();
        } else {
            const guilds = await client.guilds.cache.map(guild => guild.id);
            let owners = [];

            for (const guild of guilds) {
                let getGuild = await client.guilds.fetch(guild, true, true)
                let ownerId = getGuild.ownerID;
                if (!owners.includes(ownerId)) {
                    try {
                        await owners.push(ownerId);
                        await (await client.users.fetch(ownerId, true, true)).send(noticeTxt.toString());
                    } catch (e) {
                        console.error(e);
                        process.exit();
                    }
                }
            }

            console.log('DONE');
            process.exit();
        }
    } catch (e) {
        console.error(e);
        process.exit();
    }
});