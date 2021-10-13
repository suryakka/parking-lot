
const ERROR_SERVICE = require('../../services/parking_lot_service_constant.js');
var processUserCommands = require('../user_commands.js'), chalk = require('chalk');
const { COMMAND_LOG } = require('../user_commands_constant.js');
afterEach(() => {
  jest.resetAllMocks();
});

// describe('status command error test', () => {
//   beforeEach(() => {
//     console.log = jest.fn(); // create a new mock function for each test
//   });
//   test('status success test', () => {
//     const consoleSpy = jest.spyOn(console, 'log');
//     processUserCommands('status');
//     expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Sorry, parking lot is empty'));
//   })
// })

describe('no parking lot created test', () => {
  beforeEach(() => {
    console.log = jest.fn(); // create a new mock function for each test
  });
  test('park car failed because no parking lot test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('park II');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Sorry, the parking lot has not been created'));
  });
  test('park car failed because no parking lot test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('leave II');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Sorry, the parking lot has not been created'));
  });
});

describe('status command test', () => {
  beforeEach(() => {
    console.log = jest.fn(); // create a new mock function for each test
  });
  afterEach(() => {
    processUserCommands('create_parking_lot 6');
    processUserCommands('park KK-1234-II');
  });
  test('status failed test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('status');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold(ERROR_SERVICE.NO_PARKING_LOT_CREATED));
  });
  test('status success test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    var arr = new Array();
    arr.push('Slot No. Registration.');
    arr.push('1.  KK-1234-II');
    processUserCommands('status');
    expect(consoleSpy).toHaveBeenCalledWith(arr.join('\n'));
  });
});
describe('create parking lot command test', () => {
  beforeEach(() => {
    console.log = jest.fn(); // create a new mock function for each test
  });
  test('create_parking_lot success test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('create_parking_lot 6');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow.bold(COMMAND_LOG.CREATED_PARKING_LOT + '6' + COMMAND_LOG.SLOTS));

  });
  test('create_parking_lot error test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('create_parking_lot 0');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold(ERROR_SERVICE.MINIMUM_ONE_SLOT));
  });
});
describe('park command test', () => {

  beforeEach(() => {
    processUserCommands('create_parking_lot 2');
    console.log = jest.fn(); // create a new mock function for each test
  });
  test('park success test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('park KK-1234-HH');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.green(COMMAND_LOG.ALLOCATED_SLOT + '1'));
  });
  test('park error test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('park');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold(ERROR_SERVICE.PLEASE_PROVIDE_REGIS_NUMBER));
  });
  test('park error because car already parked test', () => {
    processUserCommands('park SS');
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('park SS');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold(ERROR_SERVICE.CAR_WITH_REGIS_NUMBER + 'SS' + ERROR_SERVICE.IS_ALREADY_PARKED));
  });

  test('park car full test', () => {
    processUserCommands('create_parking_lot 1');
    processUserCommands('park HH');
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('park II');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Sorry, parking lot is full'));
  });


});

describe('leave command test', () => {
  beforeEach(() => {
    processUserCommands('create_parking_lot 6');
    processUserCommands('park KK-1234-HH');
    console.log = jest.fn(); // create a new mock function for each test
  });
  test('leave success test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('leave KK-1234-HH 3');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.blue(COMMAND_LOG.REGISTATION_NUMBER + 'KK-1234-HH' + COMMAND_LOG.WITH_SLOT_NUMBER + '1' + COMMAND_LOG.IS_FREE_WITH_CHARGE + '30'));
  });
  test('leave success test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('leave KK-1234-HH 1');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.blue(COMMAND_LOG.REGISTATION_NUMBER + 'KK-1234-HH' + COMMAND_LOG.WITH_SLOT_NUMBER + '1' + COMMAND_LOG.IS_FREE_WITH_CHARGE + '20'));
  });
  test('leave error test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('leave KK-1234-HH');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold(ERROR_SERVICE.PLEASE_PROVIDE_PARKING_DURATION));
  });
  test('leave error no registration number test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('leave ');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold(ERROR_SERVICE.PLEASE_PROVIDE_REGIS_NUMBER));
  });
  test('leave car not found test', () => {
    processUserCommands('create_parking_lot 1');
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('leave II');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Registration number II not found'));
  });
});

describe('invalid command test', () => {
  beforeEach(() => {
    console.log = jest.fn(); // create a new mock function for each test
  });
  test('invalid command test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('surya tamvan');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('surya tamvan' + COMMAND_LOG.INVALID_COMMAND));
  });
});
describe('exit command test', () => {
  var process = processUserCommands('exit');
  expect(process).toBe(0);
});
