import React from 'react'
import { connect } from 'react-redux'
import { setSelectedPath } from './../../reducers/pathsReducer'
import { scrollToPath } from './../../reducers/pathListReducer'
import { clickTol } from './../../constants'
import { utils } from './../../utils/index'

class PathShort extends React.Component {
    layerId = 'shortestPath'
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
        const { map, shortPathFC, setSelectedPath, scrollToPath } = this.props
        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: shortPathFC })
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
        const { map, shortPathFC } = this.props
        map.moveLayer('pathsGreen', this.layerId)

        if (this.source !== undefined) {
            this.source.setData(shortPathFC)
        } else {
            map.once('sourcedata', () => {
                this.source.setData(shortPathFC)
            })
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    shortPathFC: state.paths.shortPathFC,
})

const ConnectedPathShort = connect(mapStateToProps, { setSelectedPath, scrollToPath })(PathShort)

export default ConnectedPathShort
