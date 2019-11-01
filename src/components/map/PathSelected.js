import React from 'react'
import { connect } from 'react-redux'

class PathSelected extends React.Component {
    layerId = 'selectedPath'
    source
    paint = {
        'line-width': 5,
        'line-opacity': 1,
        'line-color': 'black',
        'line-offset': 1,
    }
    layout = {
        'line-join': 'round',
        'line-cap': 'round',
    }

    componentDidMount() {
        const { map, selPathFC } = this.props
        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: selPathFC })
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
        const { map, selPathFC, detourLimit } = this.props

        if (this.source !== undefined) {
            this.source.setData(selPathFC)
            map.setFilter(this.layerId, ['<=', 'len_diff', detourLimit.limit])
        } else {
            map.once('sourcedata', () => {
                this.source.setData(selPathFC)
            })
            map.setFilter(this.layerId, ['<=', 'len_diff', detourLimit.limit])
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    selPathFC: state.paths.selPathFC,
    detourLimit: state.paths.detourLimit,
})

const ConnectedPathSelected = connect(mapStateToProps, null)(PathSelected)

export default ConnectedPathSelected
