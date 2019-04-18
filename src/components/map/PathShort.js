import React from 'react'
import { connect } from 'react-redux'

class PathShort extends React.Component {
    layerId = 'shortestPath'
    source
    paint = {
        'line-width': 2,
        'line-opacity': 1,
        'line-color': 'red',
    }
    layout = {
        'line-join': 'round',
        'line-cap': 'round',
    }

    componentDidMount() {
        const { map, sPathFC } = this.props
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

const ConnectedPathShort = connect(mapStateToProps, null)(PathShort)

export default ConnectedPathShort
