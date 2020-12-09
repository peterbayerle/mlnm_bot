const fs = require('fs');

var villageModelPath = './model/villages.json';
var isANumber = x => isNaN(x) === false;

module.exports = {
  name: 'add-village',
  description: 'log village coords',
  execute(msg, args) {
    if (args.length < 3) {
      throw 'at least three arguments expected';
    } else if (args.slice(0, 3).map(isANumber).includes(false)) {
      throw 'first three args must be valid numbers';
    } else {
      var villagesString = fs.readFileSync(villageModelPath, 'utf8');
      var villages = JSON.parse(villagesString);
      var world = 'overworld';
      if (args.length > 3 && (args[3] == 'end' || args[3] == 'e')) {
        world = 'end';
      }
      villages[world]['villages'].push(args.slice(0, 3));
      fs.writeFileSync(villageModelPath, JSON.stringify(villages, null, 2));
      msg.channel.send(`New ${world} village added at (${args.slice(0,3)}) 🏘`);
    }
  }
};
