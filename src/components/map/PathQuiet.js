import React from 'react'
import { connect } from 'react-redux'

class PathQuiet extends React.Component {
    layerId = 'quietPaths'
    source
    paint = {
        'line-width': 3,
        'line-opacity': 0.6,
        'line-color': 'green',
    }
    layout = {
        'line-join': 'round',
        'line-cap': 'round',
    }

    componentDidMount() {
        const { map, qPathFC } = this.props
        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: qPathFC })
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
        const { map, qPathFC } = this.props

        if (this.source !== undefined) {
            this.source.setData(qPathFC)
        } else {
            map.once('sourcedata', () => {
                this.source.setData(qPathFC)
            })
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    qPathFC: state.paths.qPathFC,
})

const ConnectedPathQuiet = connect(mapStateToProps, null)(PathQuiet)

export default ConnectedPathQuiet
