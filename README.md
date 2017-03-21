## How to start the server locally

Application is developed with Node.js tech stack, so you need `node` and `npm` in order to build and run it locally.

First, clone this repository
```
git clone https://github.com/bidiu/weather-app.git
```

and then switch to the project's root directory
```
cd weather-app
```

and then install dependencies
```
npm install
```

and then rename `./config.example.js` to `./config.js`, edit it as following
```
// https://openweathermap.org/appid
// put the weather API key down below
config.apiKey = 'Your weather API key goes here';
```

and then build the project

```
./node_modules/.bin/webpack
```

or build for production
```
./node_modules/.bin/webpack --config webpack.production.config.js
```

and then start the server
```
DEBUG=weather-app:* npm start
```

finally, open a browser, go to the following URL
```
http://localhost:3000
```

## Notes
- Only been tested on Chrome, Firefox and Safari
- Currently not responsive
- This application uses HTML5 Geolocation API to provide weather data of user's current location
- **Geolocation is banned in Safari in Sierra (macOS 10.12) for insecure connections, even with localhost.**
