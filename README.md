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
- [API](#api)
    - [Run the API without Docker](#run-the-api-without-docker)
    - [Run the API using Docker](#run-the-api-using-docker)
     


# Getting Started

This is a testing framework for testing the UI of `https://node-fs-app.herokuapp.com/`.

The project uses selenium webdriver with TypeScript and Mocha and Selenium Webdriver.

The tests can be triggered directly through the project or through an API call that the service also provides.

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
    docker-compose up --build ui-tests
    ```
5. After the tests finish you should see the results in the logs. 
In addition to that a report in HTML format will be generated in `./reports/mocha-report.html` and the test data that were used will appaer in `./reports/testData.json`.

# API

The tests can be triggered directly through an API call that the service also provides.

## Run the API without Docker

1. Install npm packages
    ```
    npm install
    ```
2. The Api listens by default on port `3018`. 
*If you want to change the default port go to: 
    ```sh
    ./api/config/config.json
    ```
3. Start the Api:
    ```sh
    npm run startApi
    ```

4. The Endpoint that starts the tests is HTTP GET and listens on:
    ```sh
    http://localhost:3018/api/tests/runTests
    ```

5. The Endpoint will return a response that has the Status of the TestRun which includes the tests and the report.
In addition to that a report in HTML format will be generated in `./reports/mocha-report.html` and the test data that were used will appaer in `./reports/testData.json`.
The following is an example of the response: 
    ```sh
    {
        "status": "Passed",
        "results": [
            {
            "title": "Testing Suite: E2E  User  Creation ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  User  Login ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  User  Change Settings ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Project 1 Create ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Project 1 Edit ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Project 2 Create ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Task 1 of Project 1 Create ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Task 2 of Project 1 Create ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Task 1 of Project 1 Edit ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Project 3 Create ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Task 1 of Project 3 Create ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  TaskDB  Sort Tasks ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  TaskDB  Search Task",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Deleting Tasks & Projects  Task 1 of Project 1 Delete ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Deleting Tasks & Projects  Project 2 Delete ",
            "status": "Passed"
            }
        ],
        "reportPath": "C:\\src\\workable-assignment\\reports\\report.html"
    }
    ```

## Run the API using Docker

1. The Api listens by default on port `3018`. 
*If you want to change the default port go to: 
    ```sh
    ./apiTesting/docker-compose-api.yml
    ```
    *And change the ports: 
     ```sh
    ports:
            - "3018:3018"
    ```
    *You will also have to change the port at:
    ```sh
    ./apiTesting/api/config/config.json
    ```
2. Start the Api:
    ```sh
    docker-compose up --build testing-api
    ```
3. The Endpoint that starts the tests is HTTP GET and listens on: 
    ```sh
    http://localhost:3018/api/mochaTests/runTests
    ```
4. The Endpoint will return a response that has the Status of the TestRun which includes the tests and the report.
In addition to that a report in HTML format will be generated in `./reports/mocha-report.html` and the test data that were used will appaer in `./reports/testData.json`.
The following is an example of the response: 
    ```sh
    {
        "status": "Passed",
        "results": [
            {
            "title": "Testing Suite: E2E  User  Creation ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  User  Login ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  User  Change Settings ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Project 1 Create ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Project 1 Edit ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Project 2 Create ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Task 1 of Project 1 Create ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Task 2 of Project 1 Create ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Task 1 of Project 1 Edit ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Project 3 Create ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Projects & Tasks Task 1 of Project 3 Create ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  TaskDB  Sort Tasks ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  TaskDB  Search Task",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Deleting Tasks & Projects  Task 1 of Project 1 Delete ",
            "status": "Passed"
            },
            {
            "title": "Testing Suite: E2E  Deleting Tasks & Projects  Project 2 Delete ",
            "status": "Passed"
            }
        ],
        "reportPath": "C:\\src\\workable-assignment\\reports\\report.html"
    }
    ```

<div align="center">
Enjoy
</div>