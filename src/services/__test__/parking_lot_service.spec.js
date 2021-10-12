
const ParkingLotService = require('../../services/parking_lot_service.js'), fs = require('fs');
require('jest');

var commands = [],
  totalParkings,
  parkingLot = new ParkingLotService();


test('park car failed because no parking lot test', () => {
  expect(() => parkingLot.parkCar('park II')).toThrow('Sorry, the parking lot has not been created');
});

test('leave car failed because no parking lot test', () => {
  expect(() => parkingLot.leave('leave II')).toThrow('Sorry, the parking lot has not been created');
});

test('create parking lot test', () => {
  totalParkings = parkingLot.createParkingLot('create_parking_lot 6');
  expect(totalParkings).toEqual(6);
});

test('park car full test', () => {
  expect(() => {
    parkingLot.createParkingLot('create_parking_lot 1');
    parkingLot.parkCar('park HH');
    parkingLot.parkCar('park II');
  }).toThrow('Sorry, parking lot is full');
});

test('leave car not found test', () => {
  expect(() => {
    parkingLot.createParkingLot('create_parking_lot 2');
    parkingLot.leave('leave XX 3');
  }).toThrow('Registration number XX not found');
});

test('leave car not found test', () => {
  expect(() => {
    parkingLot.leave('leave');
  }).toThrow('Please provide registration number');
});
