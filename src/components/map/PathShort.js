import React from 'react'
import { connect } from 'react-redux'
import { setSelectedPath } from './../../reducers/pathsReducer'
import { clickTol } from './../../constants'
import { utils } from './../../utils/index'

class PathShort extends React.Component {
    layerId = 'shortestPath'
    source
    paint = {
        'line-width': 3,
        'line-opacity': 1,
        'line-color': 'red',
        'line-dasharray': [1, 2.5],
    }
    layout = {
        'line-join': 'round',
        'line-cap': 'round',
    }

    componentDidMount() {
        const { map, sPathFC, setSelectedPath } = this.props
        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: sPathFC })
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
                }
            })
        })
    }

    componentDidUpdate = () => {
        const { map, sPathFC } = this.props
        map.moveLayer('quietPaths', this.layerId)

        if (this.source !== undefined) {
            this.source.setData(sPathFC)
        } else {
            map.once('sourcedata', () => {
                this.source.setData(sPathFC)
            })
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    sPathFC: state.paths.sPathFC,
})

const ConnectedPathShort = connect(mapStateToProps, { setSelectedPath })(PathShort)

export default ConnectedPathShort
