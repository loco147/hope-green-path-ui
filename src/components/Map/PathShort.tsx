import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { GeoJSONSource, MapMouseEvent } from 'mapbox-gl'
import { setSelectedPath } from './../../reducers/pathsReducer'
import { scrollToPath } from './../../reducers/pathListReducer'
import { clickTol } from './../../constants'
import { utils } from './../../utils/index'

class PathShort extends React.Component<PropsFromRedux> {
  layerId = 'shortestPath'
  source: GeoJSONSource | undefined
  paint = {
    'line-width': 4.3,
    'line-opacity': 1,
    'line-color': '#252525',
  }
  layout = {
    'line-join': 'round',
    'line-cap': 'round',
  }

  componentDidMount() {
    // @ts-ignore - map is given to all children of Map
    const { map } = this.props
    const { shortPathFC, setSelectedPath, scrollToPath } = this.props
    map.once('load', () => {
      // Add layer
      map.addSource(this.layerId, { type: 'geojson', data: shortPathFC })
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
      map.on('click', (e: MapMouseEvent) => {
        const features = utils.getLayersFeaturesAroundClickE([this.layerId], e, clickTol, map)
        if (features.length > 0) {
          const clickedFeat = features[0]
          setSelectedPath(clickedFeat.properties!.id)
          scrollToPath(clickedFeat.properties!.id)
        }
      })
    })
  }

  componentDidUpdate = () => {
    // @ts-ignore - map is given to all children of Map
    const { map } = this.props
    const { shortPathFC } = this.props
    map.moveLayer('pathsGreen', this.layerId)

    if (this.source !== undefined) {
      // @ts-ignore - it's valid geojson
      this.source.setData(shortPathFC)
    } else {
      map.once('sourcedata', () => {
        if (this.source) {
          // @ts-ignore - it's valid geojson
          this.source.setData(shortPathFC)
        }
      })
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = (state: ReduxState) => ({
  shortPathFC: state.paths.shortPathFC,
})

const connector = connect(mapStateToProps, { setSelectedPath, scrollToPath })
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(PathShort)
