export const BASEMAPS = {
  Streets: {
    url: 'mapbox://styles/joose/cjvbyzwuk31oe1fohk6s9ev4b',
  },
  Light: {
    url: 'mapbox://styles/joose/cjup4uo4i0omw1fr2z1j5onm3'
  }
}

export const pathTypes = {
  short: 'short_p',
  clean: 'clean',
  quiet: 'quiet',
}

export const statTypes = {
  aq: 'air quality',
  noise: 'noise',
}

export const dBColors = {
  40: '#00EC00',
  50: '#56FF3B',
  55: '#C6F519',
  60: '#FFD000',
  65: '#FF6E1B',
  70: '#FF270E',
}

export const aqiLabels = {
  1: 'very good',
  2: 'satisfactory',
  3: 'fair',
  4: 'poor',
  5: 'very poor'
}

export const aqiColors = {
  1: '#00EC00',
  2: '#C6F519',
  3: '#FFD000',
  4: '#FF6E1B',
  5: '#FF270E',
}

export const menu = {
  lengthLimitSelector: 'length_limit_selector',
  pathList: 'path_list',
}

export const clickTol = 12

export const initialMapCenter = { lng: 24.9664, lat: 60.2110 }

export const initialMapCenterProd = { lng: 24.937886, lat: 60.180808 }

export const initialOriginTargetFeatures = [
  {
    type: 'Feature',
    properties: {
      type: 'origin'
    },
    geometry: {
      type: 'Point',
      coordinates: [
        24.969963133335114,
        60.21743118046364
      ]
    }
  },
  {
    type: 'Feature',
    properties: {
      type: 'target'
    },
    geometry: {
      type: 'Point',
      coordinates: [
        24.96282577514648,
        60.20522256018594
      ]
    }
  }
]