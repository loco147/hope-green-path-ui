import bbox from '@turf/bbox'
import buffer from '@turf/buffer'
// @ts-ignore
import distance from '@turf/distance'
// @ts-ignore
import booleanWithin from '@turf/boolean-within'
import { featureCollection } from '@turf/helpers'
import { point } from '@turf/helpers'

export const asPoint = (coords: [number, number], properties?: {}): PointFeature => {
  return point(coords, { type: '', ...properties })
}

export const asFeatureCollection = (features: Feature[]) => {
  return featureCollection(features)
}

export const asPointFeatureCollection = (features: PointFeature[]) => {
  return featureCollection(features)
}

export const getBuffer = (geojsonFeature: FeatureCollection, dist: number) => {
  return buffer(geojsonFeature, dist, { units: 'meters' })
}

export const getBbox = (geojsonFeature: any) => {
  return bbox(geojsonFeature)
}

export const within = (feat: Feature, feat2: Feature) => {
  return booleanWithin(feat, feat2)
}

export const getDistance = (originCoords: [number, number], destCoords: [number, number]) => {
  const dist = distance(asPoint(originCoords), asPoint(destCoords), { units: 'meters' })
  return Math.round(dist)
}

export const combineFCs = (fc1: FeatureCollection, fc2: FeatureCollection) => {
  return asFeatureCollection(fc1.features.concat(fc2.features))
}

export const toLngLat = (coords: number[]) => {
  return { lng: coords[0], lat: coords[1] }
}

export const getLngLatFromFC = (FC: PointFeatureCollection) => {
  const feat = FC.features[0]
  if (feat) {
    return toLngLat(feat.geometry.coordinates)
  } else return null
}
