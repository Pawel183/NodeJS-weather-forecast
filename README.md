# NodeJS Weather Forecast App

## Getting Started

1. **Register on [OpenWeatherMap](https://openweathermap.org/api) and obtain your API key.**
2. Install dependencies using the `npm install` command.
3. Create a folder named "private" using the `mkdir private` command.
4. Create a text file using the `touch private/openWeather_Key.txt` command.
5. Paste your API key from OpenWeatherMap into the newly created text file.
6. Start the web server using the `node server.js` command.
7. Open your web browser and go to [http://localhost:3000/](http://localhost:3000/).

## Dependencies

- [axios](https://www.npmjs.com/package/axios)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [ejs](https://www.npmjs.com/package/ejs)
- [express](https://www.npmjs.com/package/express)
- [fs](https://www.npmjs.com/package/fs)

## Configuration

Make sure to put `YOUR_API_KEY` in `private/openWeather_Key.txt` with your actual OpenWeatherMap API key.

![Screenshot](/public/images/NodeJS Weather Forecast.png)
