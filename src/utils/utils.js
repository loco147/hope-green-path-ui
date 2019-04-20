
export const getOriginCoordsFromFC = (FC) => {
  const origin = FC.features.filter(feat => feat.properties.type === 'origin')
  const coords = origin[0].geometry.coordinates
  return coords.map(coord => Math.round(coord * 100000) / 100000)
}

export const getTargetCoordsFromFC = (FC) => {
  const target = FC.features.filter(feat => feat.properties.type === 'target')
  const coords = target[0].geometry.coordinates
  return coords.map(coord => Math.round(coord * 100000) / 100000)
}

export const getKmFromM = (m) => {
  const km = m / 1000
  const roundedKm = Math.round(km * 100) / 100
  return roundedKm
}

export const formatDiffM = (num, signs) => {
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
