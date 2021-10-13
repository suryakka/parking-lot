
var ParkingLotController = require('../parking_lot_controller.js'), controller = new ParkingLotController();
beforeEach(() => {
  console.log = jest.fn(); // create a new mock function for each test
}); 
afterEach(() => {
  jest.resetAllMocks();
});
test('park car failed because no parking lot test', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  controller.parkCar('park II');
  expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Sorry, the parking lot has not been created'));
});

test('leave car failed because no parking lot test', () => {
  expect(() => controller.leave('leave II')).toThrow('Sorry, the parking lot has not been created');
});

test('leave car not found test', () => {
  expect(() => {
    controller.leave('leave');
  }).toThrow('Please provide registration number');
});

test('leave car not found test', () => {
  expect(() => {
    controller.createParkingLot('create_parking_lot 2');
    controller.leave('leave XX 3');
  }).toThrow('Registration number XX not found');
});

test('park car full test', () => {
  controller.createParkingLot('create_parking_lot 1');
  controller.parkCar('park HH');
  const consoleSpy = jest.spyOn(console, 'log');
  controller.parkCar('park II');
  expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Sorry, parking lot is full'));
});

