import React from 'react'
import { connect } from 'react-redux'
import { setSelectedPath } from './../../reducers/pathsReducer'
import { dBColors } from './../../constants'


class PathEdges extends React.Component {
    layerId = 'pathEdges'
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
        const { map, edgeFC } = this.props
        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: edgeFC })
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
        const { map, edgeFC, detourLimit } = this.props

        if (this.source !== undefined) {
            this.source.setData(edgeFC)
            map.setFilter(this.layerId, ['<=', 'len_diff', detourLimit.limit])
        } else {
            map.once('sourcedata', () => {
                this.source.setData(edgeFC)
            })
            map.setFilter(this.layerId, ['<=', 'len_diff', detourLimit.limit])
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    edgeFC: state.paths.edgeFC,
    detourLimit: state.paths.detourLimit,
})

const ConnectedPathEdges = connect(mapStateToProps, { setSelectedPath })(PathEdges)

export default ConnectedPathEdges
