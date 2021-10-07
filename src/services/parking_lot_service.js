
var ParkingLot = require('../models/parking_lot.js');
var Car = require('../models/car.js');
const ParkingSlot = require('../models/parking_slot.js');

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
      throw new Error('Minimum one slot is required to create parking slot');
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
   * It also throws an error if only one field (either registration number or color) is provided.
   */
  parkCar(input) {
    if (parkingLot.MAX_PARKING_SLOTS > 0) {
      var carNumber;
      if (this.isParkingSlotAvailable(parkingLot.parkingSlots) == true) {
        carNumber = input.split(' ')[1];
        if (carNumber == null) {
          throw new Error('Please provide registration number');
        }
        if (parkingLot.parkingSlots.find(element => element?.CAR?.NUMBER == carNumber)) {
          throw new Error('Car with registration number ' + carNumber + ' is already parked');
        }
        var index = parkingLot.parkingSlots.findIndex(element => element.CAR == null);
          parkingLot.parkingSlots[index].CAR = new Car(carNumber);
          index = index + 1;
          return index;
        
      }
      else {
        throw new Error('Sorry, parking lot is full');
      }
    } else {
      throw new Error('Sorry, there is no parking lot created');
    }
  }

  /**
   *
   * @param {String} input user's input via terminal
   * @description it makes the slot free for the car of given registration number.
   * It throws an error if car is not found.
   */
  leave(input) {
    if (parkingLot.MAX_PARKING_SLOTS > 0) {
      var carNumber = input.split(' ')[1];
      var hour = parseInt(input.split(' ')[2]);
      if (!carNumber) { throw new Error('Please provide Registration number'); }
      if (!parkingLot.parkingSlots.find(element => element?.CAR?.NUMBER == carNumber)) {
        throw new Error('Registration number ' + carNumber + ' not found');
      }
      if (hour) {
        var index = parkingLot.parkingSlots.findIndex(element => element?.CAR?.NUMBER === carNumber);
    
          parkingLot.parkingSlots[index].CAR = null;
          return index + 1;
   
      } else {
        throw new Error('Please provide parking duration');
      }
    }
    else {
      throw new Error('Sorry, there is no parking lot created');
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
      throw new Error('Sorry, parking lot is empty');
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