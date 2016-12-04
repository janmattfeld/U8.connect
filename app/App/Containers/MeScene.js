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
    const json = {
      'eins': 'eins'
    }
    return (
        <View style={styles.view}>
          <TouchableHighlight onPress={this.clickHandler}>
            <Text>Me Page</Text>
            <div className='myProfileContainer'>
              <img className='myProfilePicture'>
              <div className='myName'></div>
              <div className='myCurrentTag'></div>
              <div className='myTags'>
                {json.map((el, index) => {
                  return (
                    <div
                      className='tag'
                      id={index}>
                    </div>
                )})}
              </div>
              <div className='myLookingFor'>Looking for people to have a  .</div>
            </div>
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
