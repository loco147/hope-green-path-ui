import { turf } from './index'
import helPoly from './../helPoly.json'
import { aqiLabels, walkSpeed } from './../constants'

export const getNoiseIndexLabel = (ni) => {
  if (ni < 0.15) return 'very quiet'
  if (ni < 0.3) return 'quiet'
  if (ni < 0.5) return 'moderate noise'
  if (ni < 0.65) return 'high noise'
  if (ni < 0.75) return 'very high noise'
  if (ni >= 0.75) return 'extreme noise'
}

export const getAqiLabel = (aqi) => {
  if (aqi <= 0) return ''
  if (aqi <= 2.0) return aqiLabels[1]
  if (aqi <= 3.0) return aqiLabels[2]
  if (aqi <= 4.0) return aqiLabels[3]
  if (aqi <= 5.0) return aqiLabels[4]
  if (aqi > 5.0) return aqiLabels[5]
  return ''
}

export const getWalkTimeFromDist = (m, withSign = false) => {
  const timeS = m / walkSpeed
  const timeMin = timeS / 60
  const roundedTime = Math.round(timeMin) === 0 ? Math.round(timeMin * 10) / 10 : Math.round(timeMin)
  return withSign === true ? concatSign(roundedTime) : String(roundedTime)
}

const concatSign = (number) => {
  if (number < 0) {
    return '-' + String(number)
  } else if (number > 0) {
    return '+' + String(number)
  } else return String(number)
}

const roundTo = (number, digits) => {
  return Math.round(number * (10 * digits)) / (10 * digits)
}

export const getFormattedDistanceString = (m, withSign = false) => {
  let distance
  let unit
  if (Math.abs(m) >= 950) {
    const km = m / 1000
    distance = roundTo(km, 1)
    unit = ' km'
  } else if (Math.abs(m) > 60) {
    distance = Math.round(m / 10) * 10
    unit = ' m'
  } else {
    distance = Math.round(m)
    unit = ' m'
  }
  const distanceString = withSign === true ? concatSign(distance) : String(distance)
  return distanceString + unit
}

export const getFormattedAqiExpDiffRatio = (aqc_diff_rat) => {
  if (Math.round(aqc_diff_rat) === 0) {
    return '-' + String(Math.round(aqc_diff_rat))
  } else {
    return String(Math.round(aqc_diff_rat))
  }
}

export const getOriginCoordsFromFC = (FC) => {
  const origin = FC.features.filter(feat => feat.properties.type === 'orig')
  if (origin.length === 0) return null
  const coords = origin[0].geometry.coordinates
  return coords.map(coord => Math.round(coord * 100000) / 100000)
}

export const getDestCoordsFromFC = (FC) => {
  const dest = FC.features.filter(feat => feat.properties.type === 'dest')
  if (dest.length === 0) return null
  const coords = dest[0].geometry.coordinates
  return coords.map(coord => Math.round(coord * 100000) / 100000)
}

export const getLayersFeaturesAroundClickE = (layers, e, tolerance, map) => {
  // tolerance: pixels around point
  const bbox = [[e.point.x - tolerance, e.point.y - tolerance], [e.point.x + tolerance, e.point.y + tolerance]]
  const features = map.queryRenderedFeatures(bbox, { layers })
  return features
}

export const getBestPath = (greenPathFeatures) => {
  // if the greatest quiet path score among the paths is greater than 2 -> select the path
  if (greenPathFeatures.length > 0) {
    const goodPaths = greenPathFeatures.filter(feat => feat.properties.path_score > 0.8 && feat.properties.cost_coeff <= 10)
    if (goodPaths.length > 0) {
      const maxquietPathscore = Math.max(...goodPaths.map(path => path.properties.path_score))
      const bestPath = goodPaths.filter(feat => feat.properties.path_score === maxquietPathscore)[0]
      return bestPath
    }
  }
  return null
}

const getLengthLimit = (length, rounding) => Math.ceil(length / rounding) * rounding

export const getLengthLimits = (greenPathFeatures) => {
  const pathLengths = greenPathFeatures.map(feat => feat.properties.length)
  const pathProps = greenPathFeatures.map(feat => feat.properties)
  const limits = pathProps.reduce((acc, props) => {
    const length = props.length
    // get limit as rounded value higher than the actual length
    const limit = length > 1000 ? getLengthLimit(length, 100) : getLengthLimit(length, 50)
    // add new limit if it's not in the limits list yet
    if (acc.map(limit => limit.limit).indexOf(limit) === -1) {
      // create label for len diff to be shown in options input
      const pathCount = pathLengths.filter(x => x < limit).length
      const limitText = limit < 1000 ? String(limit) + ' m' : String(limit / 1000) + ' km'
      const label = limitText + ' (' + (String(pathCount)) + ')'
      acc.push({ limit, count: pathCount, label, cost_coeff: props.cost_coeff })
    }
    return acc
  }, [])
  return limits
}

export const getInitialLengthLimit = (lengthLimits) => {
  // return length limit that filters out paths with cost_coeff higher than 20 as default
  if (lengthLimits.length > 0) {
    if (lengthLimits.length > 1) {
      let prevDl = lengthLimits[0]
      for (let dL of lengthLimits) {
        if (dL.cost_coeff >= 20) return prevDl
        prevDl = dL
      }
    }
    return lengthLimits[lengthLimits.length - 1]
  } else return { limit: 0, count: 0, label: '' }
}

export const origDestWithinSupportedArea = (origDestFC) => {
  const origin = origDestFC.features.filter(feat => feat.properties.type === 'orig')
  const dest = origDestFC.features.filter(feat => feat.properties.type === 'dest')
  const extentFeat = helPoly.features[0]
  if (origin.length > 0 && !turf.within(origin[0], extentFeat)) {
    return 'Origin is outside the supported area'
  }
  if (dest.length > 0 && !turf.within(dest[0], extentFeat)) {
    return 'Destination is outside the supported area'
  }
  return null
}

export const validateNoiseDiffs = (shortPaths, quietPaths) => {
  if (process.env.NODE_ENV !== 'production') {
    let distancesOk = true
    const shortPath = shortPaths[0]
    for (let quietPath of quietPaths) {
      for (let dB of [40, 45, 50, 55, 60, 65, 70, 75]) {
        const qDist = quietPath.properties.noises[dB] ? quietPath.properties.noises[dB] : 0
        const qDistDiff = quietPath.properties.noises_diff[dB] ? quietPath.properties.noises_diff[dB] : 0
        const sDist = shortPath.properties.noises[dB] ? shortPath.properties.noises[dB] : 0
        const sDistCheck = qDist - qDistDiff
        const distCheckDiff = sDistCheck - sDist
        if (Math.abs(distCheckDiff) > 1) {
          distancesOk = false
          console.log('Error in quietPath dB distance diff vs shortPath dB distance:')
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
