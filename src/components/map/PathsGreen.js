import React from 'react'
import { connect } from 'react-redux'
import { setSelectedPath } from '../../reducers/pathsReducer'
import { scrollToPath } from '../../reducers/pathListReducer'
import { clickTol } from '../../constants'
import { utils } from '../../utils/index'

class PathsGreen extends React.Component {
    layerId = 'pathsGreen'
    source
    paint = {
        'line-width': 4.3,
        'line-opacity': 1,
        'line-color': '#252525',
    }
    layout = {
        'line-join': 'round',
        'line-cap': 'round',
    }

    componentDidMount() {
        const { map, quietPathFC, setSelectedPath, scrollToPath } = this.props
        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: quietPathFC })
            this.source = map.getSource(this.layerId)
            map.addLayer({
                id: this.layerId,
                source: this.layerId,
                type: 'line',
                paint: this.paint,
                layout: this.layout,
            })
            map.on('mouseenter', this.layerId, () => { map.getCanvas().style.cursor = 'pointer' })
            map.on('mouseleave', this.layerId, () => { map.getCanvas().style.cursor = '' })
            map.on('click', (e) => {
                const features = utils.getLayersFeaturesAroundClickE([this.layerId], e, clickTol, map)
                if (features.length > 0) {
                    const clickedFeat = features[0]
                    setSelectedPath(clickedFeat.properties.id)
                    scrollToPath(clickedFeat.properties.id)
                }
            })
        })
    }

    componentDidUpdate = () => {
        const { map, showingPathsType, quietPathFC, cleanPathFC, lengthLimit } = this.props
        let greenPathsFC
        if (showingPathsType === 'clean') {
            greenPathsFC = cleanPathFC
        } else {
            greenPathsFC = quietPathFC
        }

        if (this.source !== undefined) {
            this.source.setData(greenPathsFC)
            map.setFilter(this.layerId, ['<=', 'length', lengthLimit.limit])
        } else {
            map.once('sourcedata', () => {
                this.source.setData(greenPathsFC)
            })
            map.setFilter(this.layerId, ['<=', 'length', lengthLimit.limit])
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    showingPathsType: state.paths.showingPathsType,
    quietPathFC: state.paths.quietPathFC,
    cleanPathFC: state.paths.cleanPathFC,
    lengthLimit: state.paths.lengthLimit,
})

const ConnectedPathsGreen = connect(mapStateToProps, { setSelectedPath, scrollToPath })(PathsGreen)

export default ConnectedPathsGreen
