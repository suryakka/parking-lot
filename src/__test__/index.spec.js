
const fs = require('fs');
const chalk = require('jest-matcher-utils/node_modules/chalk');
const processUserCommands = require('../controller/user_commands');
const { COMMAND_LOG } = require('../controller/user_commands_constant');


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
  );
});
beforeEach(() => {
  console.log = jest.fn(); // create a new mock function for each test
});
test('Test for reading input test data', () => {

  const consoleSpy = jest.spyOn(console, 'log');
  fs.readFile('assets/input.txt', 'utf-8', function (err, data) {
    if (err) {
      throw 'Unable to read input test file';
    }
    commands = JSON.parse(JSON.stringify(data)).split('\n');
    expect(commands[0].split(' ')[0]).toEqual('create_parking_lot');
    expect(commands[1].split(' ')[0]).toEqual('park');
    expect(commands[7].split(' ')[0]).toEqual('leave');
  });
  processUserCommands('create_parking_lot 5');
  expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow.bold(COMMAND_LOG.CREATED_PARKING_LOT + '5' + COMMAND_LOG.SLOTS));
});
