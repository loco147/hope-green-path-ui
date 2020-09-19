import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

class MapControl extends Component<PropsFromRedux & { map?: MbMap }> {

  getFitBoundsOptions = (showingPaths: boolean) => {
    if (window.innerWidth < 544) {
      if (showingPaths) {
        return { padding: { top: 90, bottom: 310, left: 40, right: 40 } }
      } else {
        return { padding: { top: 140, bottom: 140, left: 40, right: 40 } }
      }
    } else return { padding: { top: 120, bottom: 90, left: 430, right: 50 } }
  }

  componentDidUpdate = (prevProps: PropsFromRedux) => {
    const { map, showingPaths } = this.props
    const { zoomToBbox } = this.props.mapState

    const { userLocHistory } = this.props.userLocation
    if (userLocHistory.length === 1 && prevProps.userLocation.userLocHistory.length === 0) {
      map!.easeTo({ center: userLocHistory[0], zoom: 13.7 })
    }
    if (zoomToBbox !== prevProps.mapState.zoomToBbox) map!.fitBounds(zoomToBbox, this.getFitBoundsOptions(showingPaths))

    if (this.props.mapState.basemap !== prevProps.mapState.basemap) {
      console.log('Need to update basemap to', this.props.mapState.basemap);
      map!.setStyle(this.props.mapState.basemap)
    }
  }
  render() { return null }
}

const mapStateToProps = (state: ReduxState) => ({
  userLocation: state.userLocation,
  mapState: state.map,
  showingPaths: state.paths.waitingPaths || state.paths.showingPaths
})

const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(MapControl)
