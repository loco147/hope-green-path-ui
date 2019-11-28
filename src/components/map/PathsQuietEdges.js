import React from 'react'
import { connect } from 'react-redux'
import { setSelectedPath } from '../../reducers/pathsReducer'
import { dBColors } from '../../constants'

class PathsQuietEdges extends React.Component {
    layerId = 'pathsQuietEdges'
    source
    paint = {
        'line-width': 2.2,
        'line-opacity': 1,
        'line-color': [
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
        const { map, quietEdgeFC, lengthLimit } = this.props

        if (this.source !== undefined) {
            this.source.setData(quietEdgeFC)
            map.setFilter(this.layerId, ['<=', 'p_length', lengthLimit.limit])
        } else {
            map.once('sourcedata', () => {
                this.source.setData(quietEdgeFC)
            })
            map.setFilter(this.layerId, ['<=', 'p_length', lengthLimit.limit])
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    quietEdgeFC: state.paths.quietEdgeFC,
    lengthLimit: state.paths.lengthLimit,
})

const ConnectedPathsQuietEdges = connect(mapStateToProps, { setSelectedPath })(PathsQuietEdges)

export default ConnectedPathsQuietEdges
