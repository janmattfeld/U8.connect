import React, { PropTypes } from 'react'
import { View, Text, ListView, ActivityIndicator, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import ScrollableTabView from 'react-native-scrollable-tab-view'

// Actions
import { scan, changeScene } from '../Reducers/action'

// Styles
import styles from './Styles/MeSceneStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Metrics } from '../Themes'
import {Scenes} from '../Constants'

class MeScene extends React.Component {

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
    return (
        <View style={styles.view}>
          <TouchableHighlight onPress={this.clickHandler}>
            <Text>Me Page</Text>
            <img className='myProfilePicture'>
          </TouchableHighlight>
        </View>
    )
  }
}

MeScene.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MeScene)
