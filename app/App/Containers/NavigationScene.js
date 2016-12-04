import React, { PropTypes } from 'react'
import { View, Text, ListView, ActivityIndicator, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import StationInput from '../Components/StationInput'
import PersonListItem from '../Components/PersonListItem'
import RouteListItem from '../Components/RouteListItem'

// Actions
import { scan, changeScene, request, setTo, setFrom, clearStations } from '../Reducers/action'

// Styles
import styles from './Styles/NavigationSceneStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Metrics, Colors } from '../Themes'
import {Scenes} from '../Constants'

class NavigationScene extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      from: 'From',
      to: 'To'
    }
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    this.datasource = new ListView.DataSource({rowHasChanged})
    this.data = this.datasource.cloneWithRows([
      // {
      //   transport: ['tram', 'sbahn', 'faehre'],
      //   startingAt: Date.now(),
      //   departureAt: Date.now(),
      // }
    ])
  }

  componentWillMount () {
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    console.log('$$Got props: ', nextProps.stations)
    console.log('$$Got Route props: ', nextProps.routes)
    let convert = (type) => {
      console.log("$$Convert type", type)
      type = type.startsWith('S') ? 'S' : type
      switch(type){
        case 'ST':
          return 'tram'
        case 'S':
          return 'sbahn'
        case 'U':
          return 'ubahn'
        case 'RE':
          return 'regio'
        default:
          return null
      }
    }
    if(nextProps.stations.length > 0){
      this.areStations = true
      this.data = this.datasource.cloneWithRows(nextProps.stations)
    }else{
      console.log("$$ Parsing routes")
      this.areStations = false
      var routes = nextProps.routes.map( (route) => {
          var transport = route.LegList.Leg.map( (conn) => {
            return convert(conn.category)
          })
          return {
            transport,
            startingAt: route.LegList.Leg[0].Origin.time,
            departureAt: route.LegList.Leg[route.LegList.Leg.length-1].Destination.time,
          }
      })
      console.log(routes)
      this.data = this.datasource.cloneWithRows(routes)
    }
  }

  clickHandler (route) {
    
    this.props.setRoute(route)
  }

  _renderRow (elem) {
    if(this.areStations && this.props.stations.length > 0){
      return (
          <TouchableHighlight onPress={() => this.selectStation(elem)}  underlayColor={Colors.background}>
            <View style={styles.listItemView}>
              <Text>{elem.name}</Text>
            </View>
          </TouchableHighlight>
      )
    }
    
    if(this.props.routes.length > 0){
      return (
          <RouteListItem route={elem} select={() => this.clickHandler(elem)}/>
      )
    }
  }

  selectStation(station){
    console.log('$$--Selected station: ', station)
    this.props.clear()
    let fromId = this.state.fromId
    let toId = this.state.toId

    if(this.isDestination){
      this.props.setTo(station)
      this.setState({
        to: station.name,
        toId: station.extId
      })
      toId = station.extId
    }else{
      this.props.setFrom(station)
      this.setState({
        from: station.name,
        fromId: station.extId
      })
      fromId = station.extId
    }

    console.log("$$Ids: ", fromId, toId)
    if(fromId && toId){
      this.props.getRoute(fromId, toId)
      this.areStations = false
    }
  }

  onChangeInput(input, isDestination) {
    this.isDestination = isDestination
    if(isDestination){
      this.setState({
        to: input
      })
    }else{
      this.setState({
        from: input
      })
    }
    this.props.getStations(input)
  }

  render () {
    return (
        <View style={styles.view}>
          <View style={styles.stationInput}>
            <StationInput value={this.state.from} onChange={(input) => this.onChangeInput(input, false)} seperator={true}/>
            <StationInput value={this.state.to} onChange={(input) => this.onChangeInput(input, true)} seperator={true}/>
          </View>
          <View>
            <ListView
              contentContainerStyle={styles.listContent}
              dataSource={this.data}
              renderRow={this._renderRow.bind(this)}
            />
          </View>
        </View>
    )
  }
}

NavigationScene.PropTypes = {
  devices: PropTypes.arrayOf(PropTypes.string)
}

const mapStateToProps = (state) => {
  return {
    stations: state.transport.stations,
    routes: state.transport.routes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRoute: (from, to) => {
      dispatch(request('routes', {from, to}))
    },
    setRoute: (route) => {
      dispatch(request('route', {route}))
    },
    getStations: (search) => {
      dispatch(request('startpoint', search))
    },
    setFrom: (station) => {
      dispatch(setFrom(station))
    },
    setTo: (station) => {
      dispatch(setTo(station))
    },
    clear: () => {
      dispatch(clearStations())
    },
    changeScene: (name) => {
      dispatch(changeScene(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationScene)
