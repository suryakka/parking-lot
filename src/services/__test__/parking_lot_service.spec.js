
const ParkingLot = require('../../models/parking_lot.js');
const ParkingLotService = require('../../services/parking_lot_service.js');
var parkingLot = new ParkingLot();
require('jest');

var
  parkingLotService = new ParkingLotService(parkingLot);

beforeEach(() => {
  parkingLot.MAX_PARKING_SLOTS = 0;
  parkingLot.parkingSlots = [];
});

test('get parking status test', () => {
  var status = parkingLotService.isParkingSlotAvailable(parkingLot);
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
