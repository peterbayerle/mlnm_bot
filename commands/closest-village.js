const fs = require('fs');

var villageModelPath = './model/villages.json';
var isANumber = x => isNaN(x) === false;
var distanceBetween = (x, y) => {
  var d = 0;
  for (var i=0; i<x.length; i++) {
    d += (x[0]-y[0])**2;
  }
  return d**(1/2);
};


module.exports = {
  name: 'closest-village',
  description: 'get coords of closest village',
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
      var villages = villages[world]['villages']

      var minDistIdx;
      if (!villages.length) {
        msg.channel.send(`You have no villages logged in the ${world}`);
        return;
      } else if (villages.length == 1) {
        minDistIdx = 0;
      } else {
        var distances = villages.map(y => distanceBetween(args.slice(0, 3), y));
        minDistIdx = distances.indexOf(Math.min(...distances));
      }

      var closestCoords = villages[minDistIdx];

      msg.channel.send(`Village ${minDistIdx+1} at (${closestCoords}) is the closest ${world} village to you`);
    }
  }
};
