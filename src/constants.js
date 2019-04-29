export const BASEMAPS = {
  Streets: {
    url: 'mapbox://styles/joose/cjnt7u6kz3m642slp23u4zy1s',
  },
  Light: {
    url: 'mapbox://styles/joose/cjnt83x2j3m6o2stesl3bgti4',
  },
  Dark: {
    url: 'mapbox://styles/joose/cjnt8gqhu1j8y2smu3bi7nnvh',
  },
  JustBlack: {
    url: 'mapbox://styles/joose/cjrotaibq2ctx2sldk6txgq9u'
  },
  QuietPathLight: {
    url: 'mapbox://styles/joose/cjup4uo4i0omw1fr2z1j5onm3'
  }
}

export const clickTol = 8

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