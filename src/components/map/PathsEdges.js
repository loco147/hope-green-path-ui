import React from 'react'
import { connect } from 'react-redux'
import { setSelectedPath } from '../../reducers/pathsReducer'
import { dBColors } from '../../constants'

const dbLineColors = [
    'match',
    ['get', 'value'],
    40, dBColors[40],
    50, dBColors[50],
    55, dBColors[55],
    60, dBColors[60],
    65, dBColors[65],
    70, dBColors[70],
    /* other */ 'white'
]

const aqiLineColors = [
    'match',
    ['get', 'value'],
    1, dBColors[40],
    2, dBColors[55],
    3, dBColors[60],
    4, dBColors[65],
    5, dBColors[70],
    /* other */ 'white'
]

class PathsEdges extends React.Component {
    layerId = 'PathsEdges'
    source
    paint = {
        'line-width': 2.2,
        'line-opacity': 1,
        'line-color': dbLineColors
    }
    layout = {
        'line-join': 'round',
        'line-cap': 'round',
    }

    componentDidMount() {
        const { map, quietEdgeFC } = this.props
        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: quietEdgeFC })
            this.source = map.getSource(this.layerId)
            map.addLayer({
                id: this.layerId,
                source: this.layerId,
                type: 'line',
                paint: this.paint,
                layout: this.layout,
            })
        })
    }

    componentDidUpdate = () => {
        const { map, showingPathsType, quietEdgeFC, cleanEdgeFC, lengthLimit } = this.props
        let greenEdgeFC
        let lineColor
        if (showingPathsType === 'clean') {
            greenEdgeFC = cleanEdgeFC
            lineColor = aqiLineColors
        } else {
            greenEdgeFC = quietEdgeFC
            lineColor = dbLineColors
        }

        if (this.source !== undefined) {
            this.source.setData(greenEdgeFC)
            map.setFilter(this.layerId, ['<=', 'p_length', lengthLimit.limit])
            map.setPaintProperty(this.layerId, 'line-color', lineColor)
        } else {
            map.once('sourcedata', () => {
                this.source.setData(greenEdgeFC)
            })
            map.setFilter(this.layerId, ['<=', 'p_length', lengthLimit.limit])
            map.setPaintProperty(this.layerId, 'line-color', lineColor)
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    showingPathsType: state.paths.showingPathsType,
    quietEdgeFC: state.paths.quietEdgeFC,
    cleanEdgeFC: state.paths.cleanEdgeFC,
    lengthLimit: state.paths.lengthLimit,
})

const ConnectedPathsEdges = connect(mapStateToProps, { setSelectedPath })(PathsEdges)

export default ConnectedPathsEdges
