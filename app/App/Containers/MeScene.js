import React, { PropTypes } from 'react'
import { View, Text, ListView, ActivityIndicator, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import MyProfile from '../Components/MyProfile'

// Actions
import { scan, changeScene } from '../Reducers/action'

// Styles
import styles from './Styles/AroundSceneStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Metrics } from '../Themes'
import {Scenes} from '../Constants'

class MeScene extends React.Component {

  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    this.datasource = new ListView.DataSource({rowHasChanged})
    this.data = this.datasource.cloneWithRows([
      {
        name: 'Paul',
        image: 'http://admissions.berkeley.edu/sites/default/files/UCB_landingpage_images_600x300_212.jpg',
        tags: ['design', 'react', 'goa', 'bouldering', 'hackathon'],
        shortTags: ['goToWork'],
        lookingFor: 'Business'
      }
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
        <MyProfile person={person} selected={() => this.clickHandler(person)}/>
    )
  }

  render () {
    return (
        <View style={styles.view}>
          <ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.data}
            renderRow={this._renderRow.bind(this)}
          />
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
