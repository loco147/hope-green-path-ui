import { turf } from './index'
import hmaPoly from './../HMA.json'
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

export const getDurationStringFromDist = (m, showSeconds = false, withSign = false) => {
  const timeSecs = m / walkSpeed
  const roundedSecs = Math.round(timeSecs)
  const timeMin = timeSecs / 60
  const roundedMins = Math.round(timeMin)
  let formattedDuration = ''
  let unit = 'min'
  if (roundedMins === 0) {
    if (showSeconds === true) {
      unit = 's'
      formattedDuration = withSign === true ? concatSign(roundedSecs) : String(roundedSecs)
    } else return ''
  } else {
    formattedDuration = withSign === true ? concatSign(roundedMins) : String(roundedMins)
  }
  return formattedDuration + ' ' + unit
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

export const getInitialLengthLimit = (lengthLimits, costCoeffLimit = 20, pathCount) => {
  // return length limit that filters out paths with cost_coeff higher than 20
  if (lengthLimits.length > 1 && pathCount > 3) {
    let prevDl = lengthLimits[0]
    for (let dL of lengthLimits) {
      if (dL.cost_coeff >= costCoeffLimit) return prevDl
      prevDl = dL
    }
  }
  return lengthLimits[lengthLimits.length - 1]
}

export const origDestWithinSupportedArea = (origDestFC) => {
  const origin = origDestFC.features.filter(feat => feat.properties.type === 'orig')
  const dest = origDestFC.features.filter(feat => feat.properties.type === 'dest')
  const extentFeat = hmaPoly.features[0]
  if (origin.length > 0 && !turf.within(origin[0], extentFeat)) {
    return 'Origin is outside the supported area'
  }
  if (dest.length > 0 && !turf.within(dest[0], extentFeat)) {
    return 'Destination is outside the supported area'
  }
  return null
}
