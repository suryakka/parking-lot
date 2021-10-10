# Parking Lot
## _Problem Statement_
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bc67b5cce7eb4a558f2401af280c1e92)](https://app.codacy.com/gh/suryakka/parking-lot?utm_source=github.com&utm_medium=referral&utm_content=suryakka/parking-lot&utm_campaign=Badge_Grade_Settings) [![GitHub last commit](https://img.shields.io/github/last-commit/suryakka/parking-lot?logo=github)](https://github.com/suryakka/parking-lot/commits/main) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/suryakka/parking-lot?logo=snyk&color=red)

- I own a parking lot that can hold up to ‘n’ cars at any given point in time. Each slot is
given a number starting at 1 increasing with increasing distance from the entry point
in steps of one. I want to create an automated ticketing system that allows my
customers to use my parking lot without human intervention.
- When a car enters my parking lot, I want to have a ticket issued to the driver. The
ticket issuing process includes us documenting the registration number (number
plate) and the colour of the car and allocating an available parking slot to the car
before actually handing over a ticket to the driver (we assume that our customers are
nice enough to always park in the slots allocated to them). 
- The customer should be allocated a parking slot which is nearest to the entry. At the exit the customer returns
the ticket with the time the car was parked in the lot, which then marks the slot they
were using as being available. 
- Total parking charge should be calculated as per the
parking time. Charge applicable is $10 for first 2 hours and $10 for every additional
hour.


## _Pre requisites_

[![GitHub top language](https://img.shields.io/github/languages/top/suryakka/parking-lot?label=NodeJS&logo=Node.js)](https://img.shields.io/github/languages/top/suryakka/parking-lot?label=NodeJS&logo=Node.js) [![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/suryakka/parking-lot?logo=github&color=teal)](https://img.shields.io/github/languages/code-size/suryakka/parking-lot?logo=github&color=teal) [![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/suryakka/parking-lot/main?logo=codefactor&logoColor=white)
](https://img.shields.io/codefactor/grade/github/suryakka/parking-lot/main?logo=codefactor&logoColor=white)

The source code for this project is written using [Node.js](https://nodejs.org/). Make sure you have [Node.js](https://nodejs.org/) installed on your computer before running this application, **if not please install Node.js from [here](https://nodejs.org/en/download/)**.

To check if you have Node.js and NPM installed by running simple commands to see what version of each is installed:

 - **Test Node.js**: To see if Node is installed, type `node -v` in Terminal. This should print the version number so you’ll see something like this `v14.17.2`.

 - **Test NPM**. To see if NPM is installed, type `npm -v` in Terminal. This should print the version number so you’ll see something like this `6.14.13`.

> **Note:** [Node installer](https://nodejs.org/en/download/) installs both Node.js and npm on your system.

## _How to run?_

This is a console application written in `Node.js`. This can be run in two modes:

1. **Interactive Mode**: An interactive terminal based shell where commands can be typed in to perform different actions.

2. **File Mode**: It accepts a filename as a parameter at the terminal and read the commands from that file.

## _Quick Start_

**Proceed to the steps below only if you've `Node.js` installed.** If not, please refer [pre requisites](#pre-requisites) section.

#### For Interactive Mode

Open terminal and navigate (`cd`) to this folder and type the following commands:

```bash
1. npm install
2. npm start
```

#### For File Mode

Open terminal and type `node src/index.js data/input.txt`.

```terminal
node src/index.js <path_to_file.txt>
```

> **Note**: You can find a few sample input files inside `assets/` folder : `node src/index.js assets/input.txt`.

## _List of User Commands_

Users can interact with the Parking Lot service via a following simple set of commands which produce a specific output:

 - ***create_parking_lot*** : `create_parking_lot 6` will create a parking lot with 6 slots.

- ***park <REGISTRATION NUMBER>*** : `park KA-01-HH-1234` will allocate the nearest slot from entry gate.

- ***leave <REGISTRATION NUMBER> <PARKING DURATION>*** : `leave KA-01-HH-1234 5` will make the slot free for the car of given registration number and charge fee $10 for first 2 hours and $10 for every additional
hour.

- ***status*** : `status` will display cars and their slot details

```bash
Slot No.  Registration No.
1         KA-01-HH-1234  
2         KA-01-HH-9999  
3         KA-01-BB-0001  
5         KA-01-HH-2701  
6         KA-01-HH-3141  
```

- **exit**: `exit` will quit the application and return to the console.

> **NOTE: Any commands which are not mentioned above will throw an error: `<INPUT> is an invalid command`**

## Modules - OOPS Approach

[![CodeFactor](https://www.codefactor.io/repository/github/suryakka/parking-lot/badge)](https://www.codefactor.io/repository/github/suryakka/parking-lot) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/b493a8f776c94a4da8974878b5b8d799)](https://www.codacy.com/gh/suryakka/parking-lot/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=suryakka/parking-lot&amp;utm_campaign=Badge_Grade)

### There are three modules defined:

`processUserCommands()` : It is function to driver different commands for entered by users to calls respective functions of ParkingLotService based on commands

> Note : if you want to read the list of user commands, please  refer [List of User Commands](#List-of-User-Commands) section.

`ParkingLotService()`: It is the main class service which is used to initialize a parking lot. In each parking lot there is maximum number of slots and an array of slots that will be occupied by the car. It has following methods:

- `createParkingLot(input)` : Creates a parking lot with given input. It throws an error `Minimum one slot is required to create parking slot` if zero or negative number (n <= 0) is provided as an input.

- `parkCar(input)` : Allocates nearest slot from entry gate to the car. It can throw following errors:

    - `Sorry, the parking lot has not been created` : When parking lot is not initialized.

    - `Sorry, parking lot is full` : When parking lot has reached its maximum capacity.

    - `Please provide registration number` : When input not contain Car registration number
    
    - `Car with registration number <REGISTRATION_NUMBER>  is already parked` : When parking the car with the same registration number in the parking lot

- `leave(input)` : Removes car in given slot in parking lot. It throws following errors:

    - `Sorry, the parking lot has not been created` : When parking lot is not initialized.

    - `Please provide registration number` : When input not contain Car registration number
  
    - `Please provide parking duration` : When input not contain parking duration

    - `Registration number <REGISTRATION_NUMBER> is not found` : When registration number entered is not found

- `getParkingCharge(input)` : Return a parking charge. Charge applicable is $10 for first 2 hours and $10 for every additional hour
- `getParkingStatus()` : Returns an array containing slot number and registration number. It throws an error `Sorry, the parking lot has not been created` if parking lot is empty.

- `findNearestAvailableSlot()` : Finds nearest free slot.

`Models` :
- `Car()`
    - `new Car(NUMBER)` : Constructor used to initialize a car object containing one field: registration number.
- `ParkingLot()`
    - `new ParkingLot(CAR, SLOT)` : Constructor used to initialize a ParkingLot object containing two field: Car model and slot.
- `ParkingSlot()`
    - `new ParkingSlot(MAX_PARKING_SLOTS, parkingSlots)` : Constructor used to initialize a ParkingSlot object containing two field: MAX_PARKING_SLOTS to define maximum of parking slots allowed and parkingSlots to define array for parking slots
    - 
## _Lint test_

`npm run test-lint` is used to run JavaScript lint tests. It detects the coding style issues. ESLint rules are defined in `.eslintrc.js` file.
`node_modules/eslint/bin/eslint.js --fix src/` can be run to fix lint errors.

## _Code Coverage_

[![Statement](./assets/badge-statements.svg)](https://github.com/suryakka/parking-lot) [![Branch](./assets/badge-branches.svg)](https://github.com/suryakka/parking-lot) [![Function](./assets/badge-functions.svg)](https://github.com/suryakka/parking-lot) [![Lines](./assets/badge-lines.svg)](https://github.com/suryakka/parking-lot)

To see code coverage report, run `npm run test:cov`.

The current code coverage for the tests are following:

| Type  | Percentage  |
|---|---|
| Statement  | 100 %  |
| Branch  | 100 % |
| Function  | 100 % |
| Lines  | 100 % |

- **Function coverage:** Has each function (or subroutine) in the program been called?
- **Statement coverage:** Has each statement in the program been executed?
- **Branch coverage:** Has each branch (also called DD-path) of each control structure (such as in if and case statements) been executed?
- **Line coverage:** Has each executable line in the source file been executed?

> **NOTE:** You can see the code-coverage report in terminal as well as detailed HTML report inside `coverage/` folder.
Go to `coverage/` folder and open `index.html`.

## _Sonarqube Scan_
SonarQube is an open source platform developed by SonarSource for continuous code quality inspection, to perform automatic reviews with static code analysis to detect bugs, code odors and security vulnerabilities in over 20 languages. programming.

To run sonar-scanner,you need to open terminal and navigate (cd) to this folder and type followings command :
```bash
1. docker-compose -f docker-compose.sonar.yml up -d
2. npm install
3. npm run test
4. npm sonar
```
> **NOTE:** Make sure you have installed [Docker](https://www.docker.com/). Or if you have any issue in running [SonarQube Scanner](https://www.npmjs.com/package/sonarqube-scanner) you can read the tutorial [here](https://medium.com/swlh/nodejs-code-evaluation-using-jest-sonarqube-and-docker-f6b41b2c319d).
## _Screenshots_

[![overview](./assets/screenshot/overview.PNG)](https://github.com/suryakka/parking-lot/blob/main/assets/screenshot/overview.PNG)

## _Dependencies Used_

- [Chalk](https://www.npmjs.com/package/chalk) : A npm module used to style terminal string. Learn more [here](https://www.npmjs.com/package/chalk).
- [Jest](https://www.npmjs.com/package/jest) : A JavaScript test framework for Node.js programs. Learn more [here](https://www.npmjs.com/package/jest).
- [ESLint](https://eslint.org/): A static code analysis tool for identifying problematic patterns found in JavaScript code. It covers both code quality and coding style issues. Learn more [here](https://eslint.org/).
- [SonarQube Scanner](https://www.npmjs.com/package/sonarqube-scanner): Code Security for more languages, with more rules, better detection and improved workflows. Learn more [here](https://www.npmjs.com/package/sonarqube-scanner).

