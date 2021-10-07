
var processUserCommands = require('../user_commands.js'), chalk = require('chalk');
afterEach(() => {
  jest.resetAllMocks();
});

// describe("status command error test", () => {
//   beforeEach(() => {
//     console.log = jest.fn(); // create a new mock function for each test
//   });
//   test('status success test', () => {
//     const consoleSpy = jest.spyOn(console, 'log');
//     processUserCommands('status');
//     expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Sorry, parking lot is empty'));
//   })
// })
describe("status command test", () => {
  beforeEach(() => {
    console.log = jest.fn(); // create a new mock function for each test
  });
  afterEach(() => {
    processUserCommands('create_parking_lot 6');
    processUserCommands('park KK-1234-II');
  });
  test('status success test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('status');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Sorry, parking lot is empty'));
  })
  test('status success test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    var arr = new Array();
    arr.push('Slot No. Registration.');
    arr.push('1.  KK-1234-II')
    processUserCommands('status');
    expect(consoleSpy).toHaveBeenCalledWith(arr.join('\n'));
  })
});
describe("create parking lot command test", () => {
  beforeEach(() => {
    console.log = jest.fn(); // create a new mock function for each test
  });
  test('create_parking_lot success test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('create_parking_lot 6');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow.bold('Created parking lot with 6 slots.'));

  })
  test('create_parking_lot error test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('create_parking_lot 0');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Minimum one slot is required to create parking slot'));
  })


})
  ;
describe("park command test", () => {
  beforeEach(() => {
    processUserCommands('create_parking_lot 2');
    console.log = jest.fn(); // create a new mock function for each test
  });
  test('park success test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('park KK-1234-HH');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.green('Allocated slot number: 1'));
  })
  test('park error test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('park');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Please provide registration number'));
  })
  test('park error because car already parked test', () => {
    processUserCommands('park SS');
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('park SS');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Car with registration number SS is already parked'));
  })
});

describe("leave command test", () => {
  beforeEach(() => {
    processUserCommands('create_parking_lot 6');
    processUserCommands('park KK-1234-HH');
    console.log = jest.fn(); // create a new mock function for each test
  });
  test('leave success test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('leave KK-1234-HH 3');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.blue('Registration number KK-1234-HH with Slot number 1 is free with Charge 30'));
  }) 
   test('leave success test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('leave KK-1234-HH 1');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.blue('Registration number KK-1234-HH with Slot number 1 is free with Charge 20'));
  })
  test('leave error test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('leave KK-1234-HH');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red('Please provide parking duration'));
  })
});

describe("invalid command test", () => {
  beforeEach(() => {
    console.log = jest.fn(); // create a new mock function for each test
  });
  test('invalid command test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    processUserCommands('surya tamvan');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('surya tamvan is an invalid command'));
  })
});
describe("exit command test",()=>{
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });
  processUserCommands('exit');
  expect(mockExit).toHaveBeenCalledWith(0);
})