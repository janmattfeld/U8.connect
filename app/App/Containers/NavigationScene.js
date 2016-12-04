import React, { PropTypes } from 'react'
import { View, Text, ListView, ActivityIndicator, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import StationInput from '../Components/StationInput'

// Actions
import { scan, changeScene, request } from '../Reducers/action'

// Styles
import styles from './Styles/NavigationSceneStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Metrics } from '../Themes'
import {Scenes} from '../Constants'

class NavigationScene extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      from: 'From',
      to: 'To'
    }
  }

  componentWillMount () {
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
  }

  clickHandler () {
    // this.props.changeScene(Scenes.enterId)
  }

  onChangeInput(input, isDestination) {
    if(isDestination){
      this.setState({
        to: input
      })
      this.props.getStations(input)
    }else{
      this.setState({
        from: input
      })
    }
  }

  render () {
    return (
        <View style={styles.view}>
          <View style={styles.stationInput}>
            <StationInput value={this.state.from} onChange={(input) => this.onChangeInput(input, false)} seperator={true}/>
            <StationInput value={this.state.to} onChange={(input) => this.onChangeInput(input, true)} seperator={false}/>
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
    devices: [],
    scanning: []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRoute: (from, to) => {
      dispatch()
    },
    getStations: (search) => {
      dispatch(request('startpoint', search))
    },
    changeScene: (name) => {
      dispatch(changeScene(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationScene)
