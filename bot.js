const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (file of commandFiles) {
  const cmd = require(`./commands/${file}`);
  client.commands.set(cmd.name, cmd);
}

client.on('message', msg => {
	const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
	const cmd = args.shift().toLowerCase();

  if (!client.commands.has(cmd)) return;

  try {
  	client.commands.get(cmd).execute(msg, args);
  } catch (err) {
  	console.error(err);
  	msg.reply(`Error: ${err}`);
  }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);
