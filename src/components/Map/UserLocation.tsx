import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { GeoJSONSource } from 'mapbox-gl'

class UserLocation extends React.Component<PropsFromRedux> {
  layerId = 'UserLocation'
  source: GeoJSONSource | undefined
  circleStyle = {
    'circle-stroke-color': '#ff38ff',
    'circle-color': 'transparent',
    'circle-radius': 10,
    'circle-stroke-width': 2.5
  }

  componentDidMount() {
    // @ts-ignore - map is given to all children of Map
    const { map } = this.props

    map.once('load', () => {
      // Add layer
      map.addSource(this.layerId, { type: 'geojson', data: this.props.userLocFC })
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
    const { userLocFC } = this.props

    if (this.source !== undefined) {
      this.source.setData(userLocFC)
    } else {
      // @ts-ignore - map is given to all children of Map
      this.props.map.once('sourcedata', () => {
        if (this.source) {
          this.source.setData(userLocFC)
        }
      })
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = (state: ReduxState) => ({
  userLocFC: state.userLocation.userLocFC,
})

const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(UserLocation)