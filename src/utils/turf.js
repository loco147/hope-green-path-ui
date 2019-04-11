import bbox from '@turf/bbox'
import buffer from '@turf/buffer'
import booleanWithin from '@turf/boolean-within'
import { featureCollection } from '@turf/helpers'
import { point } from '@turf/helpers'

export const asPoint = (coords, properties) => {
  return point(coords, properties)
}

export const asFeatureCollection = (feature) => {
  return featureCollection(feature)
}

export const getBuffer = (geojsonFeature, dist) => {
  return buffer(geojsonFeature, dist, { units: 'meters' })
}

export const getBbox = (geojsonFeature) => {
  return bbox(geojsonFeature)
}

export const within = (feat, feat2) => {
  return booleanWithin(feat, feat2)
}

export const combineFCs = (fc1, fc2) => {
  return asFeatureCollection(fc1.features.concat(fc2.features))
}

export const getFirstPointCoords = (FC) => {
  return FC.features[0].geometry.coordinates
}
