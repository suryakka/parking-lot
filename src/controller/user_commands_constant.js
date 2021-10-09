const COMMAND = {
  CREATE_PARKING_LOT: 'create_parking_lot',
  PARK: 'park',
  LEAVE: 'leave',
  STATUS: 'status',
  EXIT: 'exit'
}

const COMMAND_LOG = {
  CREATED_PARKING_LOT: 'Created parking lot with ',
  SLOTS: ' slots.',
  ALLOCATED_SLOT: 'Allocated slot number: ',
  REGISTATION_NUMBER: 'Registration number ',
  WITH_SLOT_NUMBER: ' with Slot number ',
  IS_FREE_WITH_CHARGE: ' is free with Charge ',
  INVALID_COMMAND: ' is an invalid command'
}

module.exports = { COMMAND, COMMAND_LOG };