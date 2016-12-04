import React, { PropTypes } from 'react'
import { View, Text, ListView, ActivityIndicator, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import ScrollableTabView from 'react-native-scrollable-tab-view'

// Components
import MeScene from './MeScene'
import NavigationScene from './NavigationScene'
import AroundScene from './AroundScene'

// Actions
import { scan, changeScene } from '../Reducers/action'

// Styles
import styles from './Styles/ConnectScreenStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics } from '../Themes'
import {Scenes} from '../Constants'

class StartScreen extends React.Component {

  constructor (props) {
    super(props)
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

  render () {
    const tabSliderColor = {"backgroundColor": Colors.bvgYellowDark};
    const tabText = {
      "fontSize": Metrics.text.small
    }
    return (

      <ScrollableTabView tabBarTextStyle={tabText} tabBarActiveTextColor="black" tabBarUnderlineStyle={tabSliderColor}>
        <NavigationScene tabLabel="navigate"/>
        <AroundScene tabLabel="around"/>
        <MeScene tabLabel="me"/>
      </ScrollableTabView>
    )
  }
}

StartScreen.PropTypes = {
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
    changeScene: (name) => {
      dispatch(changeScene(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen)
