
var ParkingLotController = require('../parking_lot_controller.js'), controller = new ParkingLotController(), chalk = require('chalk');

afterEach(() => {
  jest.resetAllMocks();
});

describe('no parking lot created test', () => {
  beforeEach(() => {
    console.log = jest.fn(); // create a new mock function for each test
  });
  test('park car failed because no parking lot test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    controller.park('park II');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Sorry, the parking lot has not been created'));
  });
  test('park car failed because no parking lot test', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    controller.leave('leave II');
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Sorry, the parking lot has not been created'));
  });
});

