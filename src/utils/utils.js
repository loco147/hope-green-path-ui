import { turf } from './index'
import helPoly from './../helPoly.json'

export const getOriginCoordsFromFC = (FC) => {
  const origin = FC.features.filter(feat => feat.properties.type === 'origin')
  if (origin.length === 0) return null
  const coords = origin[0].geometry.coordinates
  return coords.map(coord => Math.round(coord * 100000) / 100000)
}

export const getTargetCoordsFromFC = (FC) => {
  const target = FC.features.filter(feat => feat.properties.type === 'target')
  if (target.length === 0) return null
  const coords = target[0].geometry.coordinates
  return coords.map(coord => Math.round(coord * 100000) / 100000)
}

export const getNoiseIndexLabel = (ni) => {
  if (ni < 0.15) return 'very low'
  if (ni < 0.3) return 'low'
  if (ni < 0.5) return 'moderate'
  if (ni < 0.65) return 'high'
  if (ni < 0.75) return 'very high'
  if (ni >= 0.75) return 'extreme'
}

const getFormattedKmString = (m, digits) => {
  const km = m / 1000
  const roundedKm = Math.round(km * (10 * digits)) / (10 * digits)
  return String(roundedKm) + ' km'
}

export const getFormattedDistanceString = (m, withSign) => {
  const distObj = {}
  distObj.m = Math.round(m)
  let distanceString
  if (m >= 1000 || m <= -1000) {
    distanceString = getFormattedKmString(m, 1)
  } else {
    distanceString = String(Math.round(m)) + ' m'
  }
  if (withSign && Math.round(m) > 0) {
    distObj.string = '+'.concat(distanceString)
  } else {
    distObj.string = distanceString
  }
  return distObj
}

export const getMString = (num, signs) => {
  if (!num) return 0
  const round = Math.round(num)
  if (signs) {
    if (round > 0) return '+'.concat(String(round))
  }
  return String(round)
}

export const getLayersFeaturesAroundClickE = (layers, e, tolerance, map) => {
  // tolerance: pixels around point
  const bbox = [[e.point.x - tolerance, e.point.y - tolerance], [e.point.x + tolerance, e.point.y + tolerance]]
  const features = map.queryRenderedFeatures(bbox, { layers })
  return features
}

export const getBestPath = (qPaths) => {
  // if the greatest quiet path score among the paths is greater than 2 -> select the path
  if (qPaths.length > 0) {
    const goodPaths = qPaths.filter(feat => feat.properties.path_score > 0.8 && feat.properties.nei_diff_rat < -9)
    if (goodPaths.length > 0) {
      const maxQpathScore = Math.max(...goodPaths.map(path => path.properties.path_score))
      const bestPath = goodPaths.filter(feat => feat.properties.path_score === maxQpathScore)[0]
      return bestPath
    }
  }
  return null
}

const getDetourLimit = (len_diff, rounding) => Math.ceil(len_diff / rounding) * rounding

export const getDetourLimits = (qPaths) => {
  const pathLenDiffs = qPaths.map(feat => feat.properties.len_diff)
  const pathProps = qPaths.map(feat => feat.properties)
  const limits = pathProps.reduce((acc, props) => {
    const lenDiff = props.len_diff
    // get limit as rounded value higher the len diff
    const limit = lenDiff > 1000 ? getDetourLimit(lenDiff, 100) : getDetourLimit(lenDiff, 50)
    // add new limit if it's not in the limits list yeet
    if (acc.map(limit => limit.limit).indexOf(limit) === -1) {
      // create label for len diff to be shown in options input
      const pathCount = pathLenDiffs.filter(x => x < limit).length
      const limitText = limit < 1000 ? String(limit) + ' m' : String(limit / 1000) + ' km'
      const label = limitText + ' (' + (String(pathCount)) + ')'
      acc.push({ limit, count: pathCount, label, minNt: props.min_nt })
    }
    return acc
  }, [])
  return limits
}

export const getInitialDetourLimit = (detourLimits) => {
  if (detourLimits.length === 0) return 0
  for (let i = 0; i < detourLimits.length; i++) {
    // initial detour limit should filter out paths with NT higher than 20
    if (detourLimits[i].minNt >= 20 && i > 0) {
      return detourLimits[i - 1].limit
    } else { continue }
  }
  return detourLimits[detourLimits.length - 1].limit
}

export const originTargetwithinSupportedArea = (originTargetFC) => {
  const origin = originTargetFC.features.filter(feat => feat.properties.type === 'origin')
  const target = originTargetFC.features.filter(feat => feat.properties.type === 'target')
  const extentFeat = helPoly.features[0]
  if (origin.length > 0 && !turf.within(origin[0], extentFeat)) {
    return 'Origin is outside the supported area'
  }
  if (target.length > 0 && !turf.within(target[0], extentFeat)) {
    return 'Destination is outside the supported area'
  }
  return null
}
