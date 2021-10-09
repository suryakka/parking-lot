
var ParkingLot = require('../models/parking_lot.js');
var Car = require('../models/car.js');
const ParkingSlot = require('../models/parking_slot.js');
const ERROR_SERVICE = require('./parking_lot_service_constant.js');

var parkingLot = new ParkingSlot();

class ParkingLotService {

  /**
   *
   * @param {String} input user's input via terminal
   * @description creates a parking lot with given maximum slot numbers.
   * It throws an error if zero or negative input is provided
   */
  createParkingLot(input) {
    parkingLot.MAX_PARKING_SLOTS = parseInt(input.split(' ')[1]);

    if (parkingLot.MAX_PARKING_SLOTS == 0 || !parkingLot.MAX_PARKING_SLOTS) {
      // minimum: 1 slot
      throw new Error(ERROR_SERVICE.MINIMUM_ONE_SLOT);
    }
    parkingLot.parkingSlots = [];
    for (var i = 0; i < parkingLot.MAX_PARKING_SLOTS; i++) {
      parkingLot.parkingSlots.push(new ParkingLot(null, i));
    }
    return parkingLot.MAX_PARKING_SLOTS;
  }

  /**
   * @param {String} input user's input via terminal
   * @description allocates nearest slot number to incoming cars.
   * It throws an error if parking lot is empty or full.
   * It throws an error if no registration number provided.
   * It also throws an error if registration numbered entered is already parked.
   */
  parkCar(input) {
    if (parkingLot.MAX_PARKING_SLOTS > 0) {
      var carNumber;
      if (this.isParkingSlotAvailable(parkingLot.parkingSlots) == true) {
        carNumber = input.split(' ')[1];
        if (carNumber == null) {
          throw new Error(ERROR_SERVICE.PLEASE_PROVIDE_REGIS_NUMBER);
        }
        if (parkingLot.parkingSlots.find(element => element?.CAR?.NUMBER == carNumber)) {
          throw new Error(ERROR_SERVICE.CAR_WITH_REGIS_NUMBER + carNumber + ERROR_SERVICE.IS_ALREADY_PARKED);
        }
        var index = parkingLot.parkingSlots.findIndex(element => element.CAR == null);
          parkingLot.parkingSlots[index].CAR = new Car(carNumber);
          index = index + 1;
          return index;
        
      }
      else {
        throw new Error(ERROR_SERVICE.PARKING_LOT_FULL);
      }
    } else {
      throw new Error(ERROR_SERVICE.NO_PARKING_LOT_CREATED);
    }
  }

  /**
   *
   * @param {String} input user's input via terminal
   * @description it makes the slot free for the car of given registration number.
   * It throws an error if parking lot is empty.
   * It throws an error if no registration number or parking duration provided.
   * It also throws an error if registration numbered entered is not found.
   */
  leave(input) {
    if (parkingLot.MAX_PARKING_SLOTS > 0) {
      var carNumber = input.split(' ')[1];
      var hour = parseInt(input.split(' ')[2]);
      if (!carNumber) { throw new Error(ERROR_SERVICE.PLEASE_PROVIDE_REGIS_NUMBER); }
      if (!parkingLot.parkingSlots.find(element => element?.CAR?.NUMBER == carNumber)) {
        throw new Error(ERROR_SERVICE.REGISTRATION_NUMBER + carNumber + ERROR_SERVICE.NOT_FOUND);
      }
      if (hour) {
        var index = parkingLot.parkingSlots.findIndex(element => element?.CAR?.NUMBER === carNumber);
    
          parkingLot.parkingSlots[index].CAR = null;
          return index + 1;
   
      } else {
        throw new Error(ERROR_SERVICE.PLEASE_PROVIDE_PARKING_DURATION);
      }
    }
    else {
      throw new Error(ERROR_SERVICE.NO_PARKING_LOT_CREATED);
    }

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
   * It throws an error if parking lot is empty.
   */
  getParkingStatus() {
    var arr = new Array();
    if (parkingLot.MAX_PARKING_SLOTS > 0) {
      arr.push('Slot No. Registration.');
      var slots = parkingLot.parkingSlots.filter(element => element.CAR != null);
      for (var i = 0; i < slots.length; i++) {
        arr.push(slots[i].SLOT + 1 + '.  ' + slots[i].CAR.NUMBER);
      }
      return arr;
    }
    else {
      throw new Error(ERROR_SERVICE.NO_PARKING_LOT_CREATED);
    }
  }


  /**
   * @description check parking slot is available or not.
   */
  isParkingSlotAvailable() {
    var isAvailable = false;
    for (var i = 0; i < parkingLot.parkingSlots.length; i++) {
      if (parkingLot.parkingSlots[i].CAR == null) {
        isAvailable = true;
      }
    }
    return isAvailable;
  }

}

module.exports = ParkingLotService;