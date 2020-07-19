
interface LngLat {
  lng: number,
  lat: number
}

type FeatureCollection = import('@turf/helpers').FeatureCollection

type Feature = import('@turf/helpers').Feature

interface PointFeature extends Feature {
  geometry: import('@turf/helpers').Point
  properties: { type: string }
}

interface PointFeatureCollection extends FeatureCollection {
  features: PointFeature[]
}

interface PolygonFeature extends Feature {
  geometry: import('@turf/helpers').Polygon
}

interface PolygonFeatureCollection extends FeatureCollection {
  features: PolygonFeature[]
}

type Properties = import('@turf/helpers').Properties

enum PathType {
  SHORT = 'short',
  CLEAN = 'clean',
  QUIET = 'quiet'
}

interface LengthLimit {
  limit: number,
  count: number,
  label: string,
  cost_coeff: number
}

interface PathDataResponse { 
  edge_FC: FeatureCollection,
  path_FC: PathFeatureCollection
}

type OdCoords = [[number, number], [number, number]]

enum AqiClass { 1 = 1, 2 = 2, 3 = 3, 4 = 4, 5 = 5 }

enum DbClass {
  40 = 40,
  45 = 45,
  50 = 50,
  55 = 55,
  60 = 60,
  65 = 65,
  70 = 70,
  75 = 75
}

interface PathProperties extends Properties {
  aqc: number
  aqc_diff: number
  aqc_diff_rat: number
  aqc_diff_score: number
  aqc_norm: number
  aqi_cl_exps: { [key in AqiClass]: number }
  aqi_m: number
  aqi_m_diff: number
  aqi_pcts: { [key in AqiClass]: number }
  cost_coeff: number
  id: string
  len_diff: number
  len_diff_rat: number
  length: number
  mdB: number
  mdB_diff: number
  missing_aqi: boolean
  missing_noises: boolean
  nei: number
  nei_diff: number
  nei_diff_rat: number
  nei_norm: number
  noise_pcts: { [key in DbClass]: number }
  noise_range_exps: { [key in DbClass]: number }
  noises: { [key: number]: number }
  path_score: number
  type: string
}

interface PathFeature extends Feature {
  geometry: import('@turf/helpers').Geometry
  properties: PathProperties
}

interface PathFeatureCollection extends FeatureCollection {
  features: PathFeature[]
}

interface EdgeFeature extends Feature {
  properties: { value: number, p_length: number }
}

interface EdgeFeatureCollection extends FeatureCollection {
  features: EdgeFeature[]
}

type ShowingPathsType = 'quiet' | 'clean'

type StatsType = 'noise' | 'air quality'

interface MapReducer {
  initialized: boolean,
  zoomToBbox: import('@turf/helpers').BBox | number[],
  center: LngLat | {},
  zoom: number
}

interface UserLocationReducer {
  watchId: number,
  expireTime: string,
  error: string | null,
  lngLat: LngLat | null,
  userLocFC: PointFeatureCollection,
  userLocHistory: [number, number][],
}

interface NotificationReducer {
  text: string | null,
  look: string | null
}

interface PathsReducer {
  cleanPathsAvailable: boolean,
  showingPathsType: ShowingPathsType,
  showingStatsType: StatsType,
  quietPathData: { od: OdCoords, data: PathDataResponse },
  cleanPathData: { od: OdCoords, data: PathDataResponse },
  selPathFC: PathFeatureCollection,
  shortPathFC: PathFeatureCollection,
  quietPathFC: PathFeatureCollection,
  cleanPathFC: PathFeatureCollection,
  quietEdgeFC: EdgeFeatureCollection,
  cleanEdgeFC: EdgeFeatureCollection,
  openedPath: PathFeature,
  lengthLimit: LengthLimit,
  lengthLimits: LengthLimit[],
  waitingPaths: boolean,
  showingPaths: boolean,
  routingId: number
}

interface PathListReducer {
  scrollToPath: string,
  routingId: number,
}

interface OrigDestReducer {
  origDestFC: PointFeatureCollection,
  useUserLocOrigin: boolean,
  waitUserLocOrigin: boolean,
  showingPaths: boolean,
  error: string | null
}

interface MapPopupReducer {
  visible: boolean,
  lngLat: LngLat | {}
}

interface VisitorReducer {
  visitedBefore: boolean
}

interface MenuReducer {
  info: boolean,
  pathPanel: boolean,
  pathPanelContent: string | null,
}

interface ReduxState {
  map: MapReducer,
  userLocation: UserLocationReducer,
  notification: NotificationReducer,
  paths: PathsReducer,
  pathList: PathListReducer,
  origDest: OrigDestReducer,
  mapPopup: MapPopupReducer,
  visitor: VisitorReducer,
  menu: MenuReducer
}