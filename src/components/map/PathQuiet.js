import React from 'react'
import { connect } from 'react-redux'
import { setSelectedPath } from './../../reducers/pathsReducer'

class PathQuiet extends React.Component {
    layerId = 'quietPaths'
    source
    paint = {
        'line-width': 2,
        'line-opacity': 1,
        'line-color': 'green',
    }
    layout = {
        'line-join': 'round',
        'line-cap': 'round',
    }

    componentDidMount() {
        const { map, qPathFC, setSelectedPath } = this.props
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
            map.on('mouseenter', this.layerId, () => { map.getCanvas().style.cursor = 'pointer' })
            map.on('mouseleave', this.layerId, () => { map.getCanvas().style.cursor = '' })
            map.on('click', this.layerId, (e) => {
                const clickedFeat = e.features[0]
                setSelectedPath(clickedFeat.properties.id)
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

const ConnectedPathQuiet = connect(mapStateToProps, { setSelectedPath })(PathQuiet)

export default ConnectedPathQuiet
