# Parking Lot
## _Problem Statement_
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bc67b5cce7eb4a558f2401af280c1e92)](https://app.codacy.com/gh/suryakka/parking-lot?utm_source=github.com&utm_medium=referral&utm_content=suryakka/parking-lot&utm_campaign=Badge_Grade_Settings)
[![GitHub last commit](https://img.shields.io/github/last-commit/suryakka/parking-lot?logo=github)](https://github.com/suryakka/parking-lot/commits/main) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/suryakka/parking-lot?logo=snyk&color=red)

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
## _Dependencies Used_


- [Chalk](https://www.npmjs.com/package/chalk) : A npm module used to style terminal string. Learn more [here](https://www.npmjs.com/package/chalk).
- [Jest](https://www.npmjs.com/package/jest) : A JavaScript test framework for Node.js programs. Learn more [here](https://www.npmjs.com/package/jest).

