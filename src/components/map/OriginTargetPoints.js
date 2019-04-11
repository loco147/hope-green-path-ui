import React from 'react'
import { connect } from 'react-redux'
import { setMapReferenceForPopups, setSelectLocationsPopup } from './../../reducers/mapPopupReducer'

class OriginTarget extends React.Component {
    layerId = 'OriginTarget'
    source
    circleStyle = {
        'circle-color': [
            'match',
            ['get', 'type'],
            'origin', '#60ce00',
            'target', '#0082ce',
            /* other */ '#51ff7c'
        ],
        'circle-stroke-color': 'black',
        'circle-radius': 5,
        'circle-stroke-width': 2
    }

    componentDidMount() {
        const { map, originTargetFC, setSelectLocationsPopup } = this.props
        console.log('geojson??', originTargetFC)

        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: originTargetFC })
            this.source = map.getSource(this.layerId)
            map.addLayer({
                id: this.layerId,
                source: this.layerId,
                type: 'circle',
                paint: this.circleStyle,
            })
            map.on('mouseenter', this.layerId, () => { map.getCanvas().style.cursor = 'pointer' })
            map.on('mouseleave', this.layerId, () => { map.getCanvas().style.cursor = '' })
            map.on('click', this.layerId, (e) => {
                const clickFeat = e.features[0]
                console.log('clickFeat:', clickFeat)
            })
            setMapReferenceForPopups(map)
            map.on('click', (e) => {
                setSelectLocationsPopup(e.lngLat)
                // console.log('clickFeat:', e.lngLat)
                // new MapboxGL.Popup()
                //     .setLngLat(e.lngLat)
                //     .setHTML('asdf')
                //     .addTo(map)
            })
        })
    }

    componentDidUpdate = () => {
        const { map, originTargetFC } = this.props

        if (this.source !== undefined) {
            this.source.setData(originTargetFC)
        } else {
            map.once('sourcedata', () => {
                this.source.setData(originTargetFC)
            })
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    originTargetFC: state.originTarget.originTargetFC,
})

const ConnectedOriginTarget = connect(mapStateToProps, { setSelectLocationsPopup })(OriginTarget)

export default ConnectedOriginTarget
