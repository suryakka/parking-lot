chalk = require('chalk');
var Service = require('../services/parking_lot_service.js'),
  parkingLotService = new Service();


/**
 *
 * @param {String} input entered via console
 * @description driver function for different commands for entered by users
 * calls respective functions of ParkingLot class based on commands
 */
function processUserCommands(input) {
  var userCommand = input.split(' ')[0],
    totalParkingSlots,
    parkingSlotNumber,
    parkingCharge;
  switch (userCommand) {
    case 'create_parking_lot':
      try {
        totalParkingSlots = parkingLotService.createParkingLot(input);
        console.log(chalk.yellow.bold('Created parking lot with ' + totalParkingSlots + ' slots.'));
      }
      catch (err) {
        console.log(chalk.red.bold(err.message));
      }
      break;

    case 'park':
      try {
        parkingSlotNumber = parkingLotService.parkCar(input);
        console.log(chalk.green('Allocated slot number: ' + parkingSlotNumber));
      }
      catch (err) {
        console.log(chalk.red.bold(err.message));
      }
      break;

    case 'leave':
      try {
        parkingSlotNumber = parkingLotService.leave(input);
        parkingCharge = parkingLotService.getParkingCharge(input);
        var registrationNumber = input.split(' ')[1];
        console.log(chalk.blue('Registration number ' + registrationNumber + ' with Slot number ' + parkingSlotNumber + ' is free with Charge ' + parkingCharge));

      }
      catch (err) {
        console.log(chalk.red(err.message)); // handling exceptions
      }
      break;

    case 'status':
      try {
        var parkingSlotStatus = parkingLotService.getParkingStatus();
        console.log(parkingSlotStatus.join('\n'));
      }
      catch (err) {
        console.log(chalk.red.bold(err.message));
      }
      break;

    case 'exit':
      process.exit(0);
    default:
      console.log(chalk.red.bold(input, 'is an invalid command'));
      break;
  }

  console.log();
}
module.exports = processUserCommands;