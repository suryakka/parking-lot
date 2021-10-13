
var ParkingSlot = require('../models/parking_slot.js');
var Car = require('../models/car.js');
const ParkingLot = require('../models/parking_lot.js');
const ERROR_SERVICE = require('./parking_lot_service_constant.js');

// var parkingLot = new ParkingLot();

class ParkingLotService {

  constructor(parkingLot) {
    this.parkingLot = parkingLot;
  }

  /**
   * @param {String} input user's input via terminal
   * @description creates a parking lot with given maximum slot numbers.
   */
  createParkingLot(input) {
    this.parkingLot.MAX_PARKING_SLOTS = input;
    this.parkingLot.parkingSlots = [];
    for (var i = 0; i < this.parkingLot.MAX_PARKING_SLOTS; i++) {
      this.parkingLot.parkingSlots.push(new ParkingSlot(null, i));
    }
    return this.parkingLot.MAX_PARKING_SLOTS;
  }

  /**
   * @param {String} input user's input via terminal
   * @description allocates nearest slot number to incoming cars.
   */
  parkCar(input) {
    var index = this.isParkingSlotAvailable(this.parkingLot.parkingSlots);
    this.parkingLot.parkingSlots[index].CAR = new Car(input);
    index = index + 1;
    return index;
  }


  /**
   * @param {String} input user's input via terminal
   * @description it makes the slot free for the car of given registration number.
   */
  leave(input) {
    var carNumber = input.split(' ')[1];
    var index = this.parkingLot.parkingSlots.findIndex((element) => element?.CAR?.NUMBER === carNumber);
    this.parkingLot.parkingSlots[index].CAR = null;
    return index + 1;
  }


  /**
   * @param {String} input user's input via terminal
   * @description Return a parking charge. Charge applicable is $10 for first 2 hours and $10 for every additional hour.
   */
  getParkingCharge(input) {
    var hour = parseInt(input.split(' ')[2]);
    var charge = 20;
    if (hour > 2) {
      charge += ((hour - 2) * 10);
    }
    return charge;
  }


  /**
   * @description Returns an array containing parking details i.e. slot no, registration number
   */
  getParkingStatus() {
    var arr = new Array();
    arr.push('Slot No. Registration.');
    var slots = this.parkingLot.parkingSlots.filter((element) => element.CAR != null);
    for (const slot of slots) {
      arr.push(slot.SLOT + 1 + '.  ' + slot.CAR.NUMBER);
    }
    return arr;
  }


  /**
   * @description check parking slot is available or not.
   */
  isParkingSlotAvailable() {
    for (const slot of this.parkingLot.parkingSlots) {
      if (slot.CAR == null) {
        return slot.SLOT
      }
    }
    return null;
  }
}

module.exports = ParkingLotService;