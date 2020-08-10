import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { GeoJSONSource, MapMouseEvent } from 'mapbox-gl'
import { setMapReferenceForPopups, setSelectLocationsPopup } from './../../reducers/mapPopupReducer'
import { clickTol } from './../../constants'
import { utils, turf } from './../../utils/index'

class OrigDest extends React.Component<PropsFromRedux> {
  layerId = 'OrigDest'
  source: GeoJSONSource | undefined = undefined
  circleStyle = {
    'circle-color': [
      'match',
      ['get', 'odType'],
      'orig', '#00fffa',
      'dest', '#00ff4c',
            /* other */ '#51ff7c'
    ],
    'circle-stroke-color': 'black',
    'circle-radius': 5,
    'circle-stroke-width': 2
  }

  componentDidMount() {
    // @ts-ignore - this is given to all children of Map
    const { map } = this.props

    const { setSelectLocationsPopup } = this.props

    map.once('load', () => {
      // Add layer
      map.addSource(this.layerId, { type: 'geojson', data: turf.asFeatureCollection([]) })
      this.source = map.getSource(this.layerId)
      map.addLayer({
        id: this.layerId,
        source: this.layerId,
        type: 'circle',
        paint: this.circleStyle,
      })
      setMapReferenceForPopups(map)
      map.on('click', (e: MapMouseEvent) => {
        // show popup only if path was not clicked
        const features = utils.getLayersFeaturesAroundClickE(['pathsGreen', 'shortestPath'], e, clickTol, map)
        if (features.length === 0) {
          setSelectLocationsPopup(e.lngLat)
        }
      })
    })
  }

  componentDidUpdate = () => {
    const { originPoint, destinationPoint } = this.props
    // @ts-ignore - this is given to all children of Map
    const odFeatures: PointFeature[] = [originPoint, destinationPoint].filter(od => od)
    const origDestFC = turf.asFeatureCollection(odFeatures)

    if (this.source !== undefined) {
      this.source.setData(origDestFC)
    } else {
      // @ts-ignore - map is given to all children of Map
      this.props.map.once('sourcedata', () => {
        if (this.source) {
          this.source.setData(origDestFC)
        }
      })
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = (state: ReduxState) => ({
  originPoint: state.origin.originObject,
  destinationPoint: state.destination.destObject,
})

const connector = connect(mapStateToProps, { setSelectLocationsPopup })
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(OrigDest)
