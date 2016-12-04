import React, { PropTypes } from 'react'
import { View, Text, ListView, ActivityIndicator, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import Route from '../Components/Route'
import PersonListItem from '../Components/PersonListItem'

// Actions
import { scan, changeScene } from '../Reducers/action'

// Styles
import styles from './Styles/AroundSceneStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Metrics } from '../Themes'
import {Scenes} from '../Constants'

class AroundScene extends React.Component {

  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    this.datasource = new ListView.DataSource({rowHasChanged})
    this.data = this.datasource.cloneWithRows([
      {
        name: 'Markus',
        image: 'http://combiboilersleeds.com/images/person/person-5.jpg',
        tags: ['musik', 'code', 'hackathon', 'musik', 'code', 'hackathon'],
        shortTags: ['coffe'],
        lookingFor: 'Date'
      },
      {
        name: 'Oliver',
        image: 'https://www.xing.com/image/0_e_0_cde85f1d9_6577915_9/oliver-schmidt-rehfeldt-foto.256x256.jpg',
        tags: ['musik', 'code', 'hackathon'],
        shortTags: ['dog'],
        lookingFor: 'Business'
      },
    ])
  }

  componentWillMount () {
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    this.data = this.datasource.cloneWithRows(nextProps.devices)
  }

  clickHandler (person) {
    
    // this.props.changeScene(Scenes.enterId)
  }

  _renderRow (person) {
    return (
        <PersonListItem person={person} selected={() => this.clickHandler(person)}/>
    )
  }

  render () {
    return (
        <View style={styles.view}>
          <Route line="S1" station="Wannsee"/>
          <ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.data}
            renderRow={this._renderRow.bind(this)}
          />
        </View>
    )
  }
}

AroundScene.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AroundScene)
