# Quiet path UI
A user interface (route planner) for quiet path route optimization application developed as part of my master's thesis ([github.com/hellej/gradu-pocs](https://github.com/hellej/gradu-pocs)). One important goal of this project is to facilitate citizens to find better walking routes as alternatives to the very shortest paths. 

## Built With
* React, Redux & Thunk
* Mapbox GL JS & Turf.js

## Installation
```
$ git clone git@github.com:hellej/quiet-path-ui.git
$ cd quiet-path-ui
$ npm install
$ npm start
```
Update your Mapbox access token to `src/components/map/Map.js`<br>
Open browser to http://localhost:3000/

## Data
* [Traffic noise zones in Helsinki 2017](https://hri.fi/data/en_GB/dataset/helsingin-kaupungin-meluselvitys-2017)
* [OpenStreetMap](https://www.openstreetmap.org/about/)

## UI
![UIexample1](/images/quiet-path-UI-1.png)
![UIexample2](/images/quiet-path-UI-2.png)

## License
[MIT](LICENSE)
