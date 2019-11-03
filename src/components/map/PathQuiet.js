import React from 'react'
import { connect } from 'react-redux'
import { setSelectedPath } from './../../reducers/pathsReducer'
import { scrollToPath } from './../../reducers/pathListReducer'
import { clickTol } from './../../constants'
import { utils } from './../../utils/index'

class PathQuiet extends React.Component {
    layerId = 'quietPaths'
    source
    paint = {
        'line-width': 5.0,
        'line-opacity': 1,
        'line-color': 'black',
    }
    layout = {
        'line-join': 'round',
        'line-cap': 'round',
    }

    componentDidMount() {
        const { map, qPathFC, setSelectedPath, scrollToPath } = this.props
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
            map.on('click', (e) => {
                const features = utils.getLayersFeaturesAroundClickE([this.layerId], e, clickTol, map)
                if (features.length > 0) {
                    const clickedFeat = features[0]
                    setSelectedPath(clickedFeat.properties.id)
                    scrollToPath(clickedFeat.properties.id)
                }
            })
        })
    }

    componentDidUpdate = () => {
        const { map, qPathFC, lengthLimit } = this.props

        if (this.source !== undefined) {
            this.source.setData(qPathFC)
            map.setFilter(this.layerId, ['<=', 'length', lengthLimit.limit])
        } else {
            map.once('sourcedata', () => {
                this.source.setData(qPathFC)
            })
            map.setFilter(this.layerId, ['<=', 'length', lengthLimit.limit])
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    qPathFC: state.paths.qPathFC,
    lengthLimit: state.paths.lengthLimit,
})

const ConnectedPathQuiet = connect(mapStateToProps, { setSelectedPath, scrollToPath })(PathQuiet)

export default ConnectedPathQuiet
