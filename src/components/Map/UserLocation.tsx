import React from 'react'
import { connect } from 'react-redux'
// import { clickTol } from './../../constants'
// import { utils } from './../../utils/index'

class UserLocation extends React.Component {
    layerId = 'UserLocation'
    source
    circleStyle = {
        'circle-stroke-color': '#ff38ff',
        'circle-color': 'transparent',
        'circle-radius': 10,
        'circle-stroke-width': 2.5
    }

    componentDidMount() {
        const { map, userLocFC } = this.props

        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: userLocFC })
            this.source = map.getSource(this.layerId)
            map.addLayer({
                id: this.layerId,
                source: this.layerId,
                type: 'circle',
                paint: this.circleStyle,
            })
        })
    }

    componentDidUpdate = () => {
        const { map, userLocFC } = this.props

        if (this.source !== undefined) {
            this.source.setData(userLocFC)
        } else {
            map.once('sourcedata', () => {
                this.source.setData(userLocFC)
            })
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    userLocFC: state.userLocation.userLocFC,
})

const ConnectedUserLocation = connect(mapStateToProps, null)(UserLocation)

export default ConnectedUserLocation
