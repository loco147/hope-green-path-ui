import React from 'react'
import { connect } from 'react-redux'

class PathSelected extends React.Component {
    layerId = 'selectedPath'
    source
    layout = {
        'icon-image': 'circle-15',
        'icon-size': 0.7,
        'symbol-placement': 'line',
        'symbol-spacing': 22,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
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
                type: 'symbol',
                layout: this.layout,
            })
        })
    }

    componentDidUpdate = () => {
        const { map, selPathFC, lengthLimit } = this.props

        if (this.source !== undefined) {
            this.source.setData(selPathFC)
            map.setFilter(this.layerId, ['<=', 'length', lengthLimit.limit])
        } else {
            map.once('sourcedata', () => {
                this.source.setData(selPathFC)
            })
            map.setFilter(this.layerId, ['<=', 'length', lengthLimit.limit])
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    selPathFC: state.paths.selPathFC,
    lengthLimit: state.paths.lengthLimit,
})

const ConnectedPathSelected = connect(mapStateToProps, null)(PathSelected)

export default ConnectedPathSelected
