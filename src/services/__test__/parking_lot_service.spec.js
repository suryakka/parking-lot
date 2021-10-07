
const ParkingLotService = require('../../services/parking_lot_service.js'), fs = require('fs');

var commands = [],
  totalParkings,
  parkingLot = new ParkingLotService();

test('park car failed because no parking lot test', () => {
  try {
    parkingLot.parkCar('park II');
    throwError();
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toBe("Sorry, there is no parking lot created");
  }
})
test('leave car failed because no parking lot test', () => {
  try {
    parkingLot.leave('leave II');
    throwError();
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toBe("Sorry, there is no parking lot created");
  }
})
test('create parking lot test', () => {
  fs.readFile('assets/input.txt', 'utf-8', function (err, data) {
    if (err) {
      throw 'Unable to read input test file';
    }
    commands = JSON.parse(JSON.stringify(data)).split('\n');
    totalParkings = parkingLot.createParkingLot(commands[0]);
    expect(totalParkings).toEqual(6);
  })
})

test('park car full test', () => {
  try {
    parkingLot.createParkingLot('create_parking_lot 1')
    parkingLot.parkCar('park HH');
    parkingLot.parkCar('park II');
    throwError();
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toBe("Sorry, parking lot is full");
  }
})

test('leave car not found test', () => {
  try {
    parkingLot.createParkingLot('create_parking_lot 2');
    parkingLot.leave('leave XX 3');
    throwError();
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toBe("Registration number XX not found");
  }
})
test('leave car not found test', () => {
  try {
    parkingLot.leave('leave');
    throwError();
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toBe("Please provide Registration number");
  }
})