const { COMMAND, COMMAND_LOG } = require('./user_commands_constant.js');

const chalk = require('chalk');
var Service = require('../services/parking_lot_service.js'),
  parkingLotService = new Service();


/**
 *
 * @param {String} input entered via console
 * @description driver function for different commands for entered by users
 * calls respective functions of ParkingLotService based on commands
 */
function processUserCommands(input) {
  var userCommand = input.split(' ')[0],
    totalParkingSlots,
    parkingSlotNumber,
    parkingCharge;
  switch (userCommand) {
    case COMMAND.CREATE_PARKING_LOT:
      try {
        totalParkingSlots = parkingLotService.createParkingLot(input);
        console.log(chalk.yellow.bold(COMMAND_LOG.CREATED_PARKING_LOT + totalParkingSlots + COMMAND_LOG.SLOTS));
      }
      catch (err) {
        console.log(chalk.red.bold(err.message));
      }
      break;

    case COMMAND.PARK:
      try {
        parkingSlotNumber = parkingLotService.parkCar(input);
        console.log(chalk.green(COMMAND_LOG.ALLOCATED_SLOT + parkingSlotNumber));
      }
      catch (err) {
        console.log(chalk.red.bold(err.message));
      }
      break;

    case COMMAND.LEAVE:
      try {
        parkingSlotNumber = parkingLotService.leave(input);
        parkingCharge = parkingLotService.getParkingCharge(input);
        var registrationNumber = input.split(' ')[1];
        console.log(chalk.blue(COMMAND_LOG.REGISTATION_NUMBER + registrationNumber + COMMAND_LOG.WITH_SLOT_NUMBER + parkingSlotNumber + COMMAND_LOG.IS_FREE_WITH_CHARGE + parkingCharge));

      }
      catch (err) {
        console.log(chalk.red.bold(err.message)); // handling exceptions
      }
      break;

    case COMMAND.STATUS:
      try {
        var parkingSlotStatus = parkingLotService.getParkingStatus();
        console.log(parkingSlotStatus.join('\n'));
      }
      catch (err) {
        console.log(chalk.red.bold(err.message));
      }
      break;

    case COMMAND.EXIT:
      process.exit(0);
    default:
      console.log(chalk.red.bold(input+COMMAND_LOG.INVALID_COMMAND));
      break;
  }

  console.log();
}
module.exports = processUserCommands;