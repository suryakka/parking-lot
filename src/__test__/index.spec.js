
const fs = require('fs');

var commands = [];
test('Test for reading input test data', () => {
  fs.readFile('assets/input.txt', 'utf-8', function (err, data) {
    if (err) {
      throw 'Unable to read input test file';
    }
    commands = JSON.parse(JSON.stringify(data)).split('\n');
    expect(commands[0].split(' ')[0]).toEqual('create_parking_lot');
    expect(commands[1].split(' ')[0]).toEqual('park');
    expect(commands[7].split(' ')[0]).toEqual('leave');
  }
  )
})