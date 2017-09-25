# Mineral tracking application

## Demo
A demo of the application can be found at [ml.l42.io](http://ml.l42.io).

## Design Points
A combo of two npm projects, the backend server and the frontend UI. So there are two package.json configs.

The node server serves as a simple layer between the Ethereum blockchain and is used to store non-trust related data.

The second application is a React-Truffle box, adjusted to interface with the Node api and it's Ethereum smart contracts.

## Local Development

### Run the API Server (/server)

1. Install node modules

```javascript
npm install
```

2. Install mongodb, and export connection URI

```javascript
export MONGODB_URI=your_mongodb_connection_URI
```

3. Create server/config.js and add secret

```javascript
 vi server/config.js
```

Add the following and save:
```javascript
module.exports = {
	secret: 'your_secret_here'
};
```

4. Start the server
```javascript
npm start
```

## Instructions for the React Truffle box (client)

1. Compile and migrate the contracts.
    ```javascript
    truffle compile
    truffle migrate
    ```

2. Run the webpack server for front-end hot reloading. For now, smart contract changes must be manually recompiled and migrated.
    ```javascript
    npm run start
    ```

3. Jest is included for testing React components and Truffle's own suite is incldued for smart contracts. Be sure you've compile your contracts before running jest, or you'll receive some file not found errors.
    ```javascript
    // Runs Jest for component tests.
    npm run test

    // Runs Truffle's test suite for smart contract tests.
    truffle test
    ```

4. To build the application for production, use the build command. A production build will be in the build_webpack folder.
    ```javascript
    npm run build
    ```
