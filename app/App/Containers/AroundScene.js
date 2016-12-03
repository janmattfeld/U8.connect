import React, { PropTypes } from 'react'
import { View, Text, ListView, ActivityIndicator, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import Route from '../Components/Route'
import personListItem from '../Components/PersonListItem'

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
        name: 'Markus'
      },
      {
        name: 'Markus'
      },
      {
        name: 'Markus'
      },
      {
        name: 'Markus'
      },
      {
        name: 'Markus'
      },
      {
        name: 'Markus'
      },
      {
        name: 'Markus'
      },
      {
        name: 'Markus'
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

  clickHandler () {
    // this.props.changeScene(Scenes.enterId)
  }

  _renderRow (person) {
    return <Text style={{fontSize: 20}}>person.name</Text>
  }

  render () {
    return (
        <View style={styles.view}>
          <Route line="S1" station="Wannsee"/>
          <ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.data}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={{height: 1, backgroundColor: 'black', marginRight: 10, marginLeft: 10}} />}
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
