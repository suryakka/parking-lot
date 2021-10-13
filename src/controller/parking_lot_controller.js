const ParkingLot = require('../models/parking_lot.js');
const chalk = require('chalk');
const { COMMAND_LOG } = require('./user_commands_constant.js');
const ERROR_SERVICE = require('../services/parking_lot_service_constant.js');
var Service = require('../services/parking_lot_service.js'), parkingLot = new ParkingLot()
var parkingLotService = new Service(parkingLot);


class ParkingLotController {
  /**
   * @param {String} input user's input via terminal
   * @description It logs create a parking lot with given maximum slot numbers.
   * It logs an error if zero or negative input is provided
   */
  createParkingLot(input) {
    var slots = parseInt(input.split(' ')[1]);
    if (slots === 0 || !slots) {
      // minimum: 1 slot
      console.log(chalk.red.bold(ERROR_SERVICE.MINIMUM_ONE_SLOT));
    } else {
      parkingLotService.createParkingLot(slots);
      console.log(chalk.yellow.bold(COMMAND_LOG.CREATED_PARKING_LOT + parkingLot.MAX_PARKING_SLOTS + COMMAND_LOG.SLOTS));
    }
  }

  /**
   * @param {String} input user's input via terminal
   * @description It logs allocates nearest slot number to incoming cars.
   * It logs an error if parking lot is empty or full.
   * It logs an error if no registration number provided.
   * It also logs an error if registration numbered entered is already parked.
   */
  park(input) {
    if (parkingLot.MAX_PARKING_SLOTS > 0) {
      var index = parkingLotService.isParkingSlotAvailable(parkingLot.parkingSlots);
      if (index != null) {
        var carNumber = input.split(' ')[1];
        if (carNumber == null) {
          console.log(chalk.red.bold(ERROR_SERVICE.PLEASE_PROVIDE_REGIS_NUMBER));
        } else
          if (parkingLot.parkingSlots.find((element) => element?.CAR?.NUMBER === carNumber)) {
            console.log(chalk.red.bold(ERROR_SERVICE.CAR_WITH_REGIS_NUMBER + carNumber + ERROR_SERVICE.IS_ALREADY_PARKED));
          }
        var parkingSlotNumber = parkingLotService.parkCar(carNumber);
        console.log(chalk.green(COMMAND_LOG.ALLOCATED_SLOT + parkingSlotNumber));
      } else {
        console.log(chalk.red.bold(ERROR_SERVICE.PARKING_LOT_FULL));
      }
    }
    else {
      console.log(chalk.red.bold(ERROR_SERVICE.NO_PARKING_LOT_CREATED));
    }
  }

  /**
   * @param {String} input user's input via terminal
   * @description it logs the slot free for the car of given registration number.
   * It logs an error if parking lot is empty.
   * It logs an error if no registration number or parking duration provided.
   * It also logs an error if registration numbered entered is not found.
   */
  leave(input) {
    if (parkingLot.MAX_PARKING_SLOTS > 0) {
      var carNumber = input.split(' ')[1];
      var hour = parseInt(input.split(' ')[2]);
      if (!carNumber) {
        console.log(chalk.red.bold(ERROR_SERVICE.PLEASE_PROVIDE_REGIS_NUMBER));
      } else
        if (!parkingLot.parkingSlots.find((element) => element?.CAR?.NUMBER === carNumber)) {
          console.log(chalk.red.bold(ERROR_SERVICE.REGISTRATION_NUMBER + carNumber + ERROR_SERVICE.NOT_FOUND));
        } else if (hour) {
          var parkingSlotNumber = parkingLotService.leave(input);
          var parkingCharge = parkingLotService.getParkingCharge(input);
          var registrationNumber = input.split(' ')[1];
          console.log(chalk.blue(COMMAND_LOG.REGISTATION_NUMBER + registrationNumber + COMMAND_LOG.WITH_SLOT_NUMBER + parkingSlotNumber + COMMAND_LOG.IS_FREE_WITH_CHARGE + parkingCharge));
        } else {
          console.log(chalk.red.bold(ERROR_SERVICE.PLEASE_PROVIDE_PARKING_DURATION));
        }
    }
    else {
      console.log(chalk.red.bold(ERROR_SERVICE.NO_PARKING_LOT_CREATED));
    }
  }

  /**
   * @description It logs parking details i.e. slot no, registration number
   * it logs an error if parking lot is empty.
   */
  status() {
    if (parkingLot.MAX_PARKING_SLOTS > 0) {
      var parkingSlotStatus = parkingLotService.getParkingStatus();
      console.log(parkingSlotStatus.join('\n'));
    }
    else {
      console.log(chalk.red.bold(ERROR_SERVICE.NO_PARKING_LOT_CREATED));
    }
  }
}
module.exports = ParkingLotController;