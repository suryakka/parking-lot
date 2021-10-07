var Parking = require('../models/parking_lot.js');
var Car = require('../models/car.js');

parkingLot = new Parking();

class ParkingLotService {

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

  /**
   * @param {String} input user's input via terminal
   * @description allocates nearest slot number to incoming cars.
   * It throws an error if parking lot is empty or full.
   * It also throws an error if only one field (either registration number or color) is provided.
   */
  parkCar(input) {
    if (parkingLot.MAX_PARKING_SLOTS > 0) {
      var car, carNumber;
      if (this.isParkingSlotAvailable(parkingLot.parkingSlots) == true) {
        carNumber = input.split(' ')[1];
        if (parkingLot.parkingSlots.find(element => element?.NUMBER == carNumber)) {
          throw new Error('Car with registration number ' + carNumber + ' is already parked');
        }
        var index = parkingLot.parkingSlots.findIndex(element => element == null);
        if (index != null) {
          car = new Car(carNumber);
          parkingLot.parkingSlots[index] = car;
          index = index + 1;
          return index;
        } else {
          throw new Error('Please provide registration number');
        }
      }
      else {
        throw new Error('Sorry, parking lot is full');
      }
    }
    else {
      throw new Error('Minimum one slot is required to create parking slot');
    }
  }


  /**
   * @description check parking slot is available or not.
   */
  isParkingSlotAvailable() {
    var isAvailable = false;
    for (var i = 0; i < parkingLot.parkingSlots.length; i++) {
      if (parkingLot.parkingSlots[i] == null) {
        isAvailable = true;
      }
    }
    return isAvailable;
  }

}

module.exports = ParkingLotService;