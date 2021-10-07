var Parking = require('../models/parking_lot.js');
var Car = require('../models/car.js');

parkingLot = new Parking();

class ParkingLotService{

  /**
   *
   * @param {String} input user's input via terminal
   * @description creates a parking lot with given maximum slot numbers.
   * It throws an error if zero or negative input is provided
   */
  createParkingLot(input) {
    parkingLot.MAX_PARKING_SLOTS = parseInt(input.split(' ')[1]);
    if (this.MAX_PARKING_SLOTS <= 0) {
      // minimum: 1 slot
      throw new Error('Minimum one slot is required to create parking slot');
    }
    for (var i = 0; i < parkingLot.MAX_PARKING_SLOTS; i++) {
      parkingLot.parkingSlots.push(null);
    }
    return parkingLot.MAX_PARKING_SLOTS;
  }

}

module.exports = ParkingLotService;