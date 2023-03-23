<br />
<div align="center">
  </a>
  <h1 align="center">QA Engineer Code Challenge</h1>
  <p align="center">
    UI Testing
    <br />
    
  </p>
</div>

<div align="center">

![ts](https://badgen.net/badge/Built%20With/TypeScript/blue) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

### Table of Contents

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
- [Tests](#tests)
    - [Run the Tests without Docker](#run-the-tests-without-docker)
    - [Run the Tests using Docker](#run-the-tests-using-docker)
     


# Getting Started

This is a testing framework for testing the UI of `https://node-fs-app.herokuapp.com/`.

The project uses selenium webdriver with TypeScript and Mocha.

## Requirements
You either need:
<h5> Docker</h5>
- Have git installed on your system.
<br>
-   Have Docker installed on your system set up with Linux containers.
<br>
-  Have docker-compose installed on your system.

<h5> Or Without Docker</h5>
- Have git installed on your system.
<br>
- Have Google Chrome installed on your system.
<br>
-   Have node & npm installed on your system.


## Installation

1. Clone the repo
    ```sh
    git clone https://github.com/billyTsag/workable-assignment
    ```



# Tests

The tests are located inside `./tests`. They are written with `mocha`.

## Run the Tests without Docker

1. Install npm packages
    ```
    npm install
    ```
2. Run the Tests
    ```
    npm run test
    ```
2. After the tests finish you should see the results in the logs. 
In addition to that a report in HTML format will be generated in `./reports/mocha-report.html` and the test data that were used will appaer in `./reports/testData.json`.

## Run the Tests using Docker

1. Start the Selenium Grid with browser containers:
    ```sh
    docker-compose -f docker-compose.selenium-hub up --build
    ```
2. The Selenium Grid UI can be accessed on: 
    ```sh
    http://localhost:4444/ui
    ```
3. By default the Tests will run using `FIREFOX`. if you wish to change it, possible values are `CHROME` or `EDGE`. 
The dockerfile is located in: 
    ```sh
    ./uiTesting/Dockerfile.yml
    ```
    and change the following: 
     ```sh
    ENV BROWSER=FIREFOX
    ```
4. Start the UI tests:
    ```sh
    docker-compose up --build
    ```
5. After the tests finish you should see the results in the logs. 
In addition to that a report in HTML format will be generated in `./reports/mocha-report.html` and the test data that were used will appaer in `./reports/testData.json`.

<div align="center">
Enjoy
</div>