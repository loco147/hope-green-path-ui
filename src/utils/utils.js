
export const getOriginCoordsFromFC = (FC) => {
    const origin = FC.features.filter(feat => feat.properties.type === 'origin')
    const coords = origin[0].geometry.coordinates
    return coords.map(coord => Math.round(coord*100000)/100000)
}

export const getTargetCoordsFromFC = (FC) => {
    const target = FC.features.filter(feat => feat.properties.type === 'target')
    const coords = target[0].geometry.coordinates
    return coords.map(coord => Math.round(coord*100000)/100000)
}
