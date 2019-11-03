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
  if (ni < 0.15) return 'very quiet'
  if (ni < 0.3) return 'quiet'
  if (ni < 0.5) return 'moderate noise'
  if (ni < 0.65) return 'high noise'
  if (ni < 0.75) return 'very high noise'
  if (ni >= 0.75) return 'extreme noise'
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
  if (Math.abs(m) >= 950) {
    // round to nearest 0.1 km
    distanceString = getFormattedKmString(m, 1)
  } else if (Math.abs(m) > 70) {
    // round to nearest 10 m
    distanceString = String(Math.round(m / 10) * 10) + ' m'
  } else {
    // round to nearest m
    distanceString = String(Math.round(m) + ' m')
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
    const goodPaths = qPaths.filter(feat => feat.properties.path_score > 0.8 && feat.properties.cost_coeff <= 10)
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
      acc.push({ limit, count: pathCount, label, cost_coeff: props.cost_coeff })
    }
    return acc
  }, [])
  return limits
}

export const getInitialDetourLimit = (detourLimits) => {
  // return detour limit that filters out paths with cost_coeff higher than 20 as initial detour limit
  if (detourLimits.length > 0) {
    if (detourLimits.length > 1) {
      let prevDl = detourLimits[0]
      for (let dL of detourLimits) {
        if (dL.cost_coeff >= 20) return prevDl
        prevDl = dL
      }
    }
    return detourLimits[detourLimits.length - 1]
  } else return { limit: 0, count: 0, label: '' }
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

export const validateNoiseDiffs = (sPaths, qPaths) => {
  if (process.env.NODE_ENV !== 'production') {
    let distancesOk = true
    const sPath = sPaths[0]
    for (let qPath of qPaths) {
      for (let dB of [40, 45, 50, 55, 60, 65, 70, 75]) {
        const qDist = qPath.properties.noises[dB] ? qPath.properties.noises[dB] : 0
        const qDistDiff = qPath.properties.noises_diff[dB] ? qPath.properties.noises_diff[dB] : 0
        const sDist = sPath.properties.noises[dB] ? sPath.properties.noises[dB] : 0
        const sDistCheck = qDist - qDistDiff
        const distCheckDiff = sDistCheck - sDist
        if (Math.abs(distCheckDiff) > 1) {
          distancesOk = false
          console.log('Error in qPath dB distance diff vs sPath dB distance:')
          console.log('dB:', dB)
          console.log('qDist:', qDist)
          console.log('qDistDiff:', qDistDiff)
          console.log('sDist:', sDist)
          console.log('sDistCheck:', sDistCheck, '(should be same as sDist)')
          console.log('distCheckDiff:', distCheckDiff)
        }
      }
    }
    distancesOk ? console.log('dB distances ok') : console.log('error in dB distances')
  }
}
