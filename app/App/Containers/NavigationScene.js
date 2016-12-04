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
    if(nextProps.stations.length > 0){
      this.areStations = true
      this.data = this.datasource.cloneWithRows(nextProps.stations)
    }else{
      this.areStations = false
      this.data = this.datasource.cloneWithRows(nextProps.routes)
    }
  }

  clickHandler () {
    // this.props.changeScene(Scenes.enterId)
  }

  _renderRow (elem) {
    if(this.areStations){
      return (
          <TouchableHighlight onPress={() => this.selectStation(elem)}  underlayColor={Colors.background}>
            <View style={styles.listItemView}>
              <Text>{elem.name}</Text>
            </View>
          </TouchableHighlight>
      )
    }else{
      return (
          <RouteListItem route={elem} selected={() => this.clickHandler(elem)}/>
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
