
const ParkingLot = require('../../models/parking_lot.js');
const ParkingLotService = require('../../services/parking_lot_service.js');
require('jest');

var parkingLotService;
var parkingLot = new ParkingLot();

beforeEach(() => {
  parkingLotService = new ParkingLotService(parkingLot);
});

test('get parking status test', () => {
  var status = parkingLotService.isParkingSlotAvailable();
  expect(status).toEqual(null);
});

test('create parking lot test', () => {
  var totalParkings = parkingLotService.createParkingLot(6);
  expect(totalParkings).toBe(6);
});

test('park car test', () => {
  parkingLotService.createParkingLot(6);
  var status = parkingLotService.parkCar('KK-HH');
  expect(status).toEqual(1);
});

test('leave car test', () => {
  parkingLotService.createParkingLot(6);
  var status = parkingLotService.leave('KK-HH');
  expect(status).toEqual(1);
});
