const { COMMAND, COMMAND_LOG } = require('./user_commands_constant.js');

const chalk = require('chalk');
var ParkingLotController = require('./parking_lot_controller.js'), controller = new ParkingLotController();

/**
 *
 * @param {String} input entered via console
 * @description driver function for different commands for entered by users
 * calls respective functions of ParkingLotService based on commands
 */
function processUserCommands(input) {
  var userCommand = input.split(' ')[0];
  switch (userCommand) {
    case COMMAND.CREATE_PARKING_LOT:
      controller.createParkingLot(input);
      break;

    case COMMAND.PARK:
      controller.park(input);
      break;

    case COMMAND.LEAVE:
      controller.leave(input);
      break;

    case COMMAND.STATUS:
      controller.status();
      break;

    case COMMAND.EXIT:
      return 0;

    default:
      console.log(chalk.red.bold(input + COMMAND_LOG.INVALID_COMMAND));
      break;
  }

  console.log();
}
module.exports = processUserCommands;
