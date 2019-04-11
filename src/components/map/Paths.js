import React from 'react'
import { connect } from 'react-redux'

class Paths extends React.Component {
    layerId = 'shortestPath'
    source
    paint = {
        'line-width': 3,
        'line-color': 'black'
    }

    componentDidMount() {
        const { map, shortestPathFC } = this.props
        console.log('geojson??', shortestPathFC)

        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: shortestPathFC })
            this.source = map.getSource(this.layerId)
            map.addLayer({
                id: this.layerId,
                source: this.layerId,
                type: 'line',
                paint: this.paint,
            })
            map.on('mouseenter', this.layerId, () => { map.getCanvas().style.cursor = 'pointer' })
            map.on('mouseleave', this.layerId, () => { map.getCanvas().style.cursor = '' })
            map.on('click', this.layerId, (e) => {
                const clickFeat = e.features[0]
                console.log('clickFeat:', clickFeat)
            })
        })
    }

    componentDidUpdate = () => {
        const { map, shortestPathFC } = this.props

        if (this.source !== undefined) {
            this.source.setData(shortestPathFC)
        } else {
            map.once('sourcedata', () => {
                this.source.setData(shortestPathFC)
            })
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    shortestPathFC: state.paths.shortestPath,
})

const ConnectedPaths = connect(mapStateToProps, null)(Paths)

export default ConnectedPaths
