const fs = require('fs');

var villageModelPath = './model/villages.json';
var isANumber = x => isNaN(x) === false;

villageStrRep = villageArray => {
  var text = '';
  if (!villageArray.length) {
    text += ' None!\n'
  } else {
    text += '\n';
    for (var i=0; i<villageArray.length; i++) {
      text += `\t• Village ${i+1}: (${villageArray[i]})\n`;
    }
  }
  return text;
}

module.exports = {
  name: 'all-villages',
  description: 'show coords of all currently logged villages',
  execute(msg, args) {
    var villagesString = fs.readFileSync(villageModelPath, 'utf8');
    var villages = JSON.parse(villagesString);

    var text = 'Currently logged villages\n';
    text += 'Overworld villages:';
    text += villageStrRep(villages['overworld']['villages']);

    text += 'End villages:';
    text += villageStrRep(villages['end']['villages']);

    msg.channel.send(text);
  }
};
