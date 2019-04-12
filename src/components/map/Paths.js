import React from 'react'
import { connect } from 'react-redux'

class Paths extends React.Component {
    layerId = 'shortestPath'
    source
    paint = {
        'line-width': 3,
        'line-opacity': 0.6,
        'line-color': [
            'match',
            ['get', 'type'],
            'short', 'red',
            'quiet', 'green',
            /* other */ '#51ff7c'
        ],
    }
    layout = {
        'line-join': 'round',
        'line-cap': 'round',
      }

    componentDidMount() {
        const { map, pathFC } = this.props
        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: pathFC })
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
                const clickFeat = e.features[0]
                console.log('clickFeat:', clickFeat)
            })
        })
    }

    componentDidUpdate = () => {
        const { map, pathFC } = this.props

        if (this.source !== undefined) {
            this.source.setData(pathFC)
        } else {
            map.once('sourcedata', () => {
                this.source.setData(pathFC)
            })
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    pathFC: state.paths.pathFC,
})

const ConnectedPaths = connect(mapStateToProps, null)(Paths)

export default ConnectedPaths
