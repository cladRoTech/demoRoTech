# DemoRoTech
Demo built to simulate a car dealership backend, technologies used:
- NodeJS
- Express
- Mongoose
- Swagger
- Karate Testing
## Configuration
To run the application make sure that:
- an instance of **mongodb-community** is running locally on port **27017** 
- port **8080** on localhost is not used

To intialize MongoDB we are going to run the ***mgodatagen*** script, with the following command:
```bash
./utility/mgodatagen -f feedMongo.json
```
This command will run the script by sourcing the json-schema form the ***feedMongo.json*** file.

In the folder **utility** is hosted the **connections** file that is exporting the mongodb address and db to be used.

## Application Startup

After running the mongodb-community instance run the following command in the terminal:
```bash
node index.js local
```
The file **index.js** is the main file for the application, in said file the api routes and configurations are loaded.

If you are developing new functions on the code it might be useful to have [nodemon](https://www.npmjs.com/package/nodemon) installed.
This package will listen for changes on all ***.js*** files and will restart the server on its own.
**Installation**:
```bash
npm install -g nodemon
```
**Run**:
```bash
nodemon index.js local
```

## Test files
Test files are stored under the following path:
```bash
/demoRoTech/test
```

As we are using **Karate Testing** the file extension should alway be ***.feature***
## Run Automated Tests
As the application is running, open a new terminal and run the following command:
```bash
karate test
```
This command will run all the ***.feature*** files in the test folder.
Instead if you want to run a specific ***.feature*** file run: 
```bash
karate test/{{fileName.feature}}
```