import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './Styles/PersonListItemStyle'

// Themes
import {Metrics, Images} from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'

export default class PersonListItem extends React.Component {

  getText () {
    const buttonText = this.props.text || this.props.children.toString()
    return buttonText.toUpperCase()
  }

  render () {
    let tagStyle = (sbahn) => {
      if(sbahn){
        return {
          ...styles.tag,
          ...styles.sbahn,
          ...styles.colorBg(this.props.line)
        }
      }else{
        return {
          ...styles.tag,
          ...styles.ubahn,
          ...styles.colorBg(this.props.line)
        }
      }
    }
    return (
      <View style={styles.view}>
        <View style={styles.tagWrapper}>
          { this.props.line.startsWith('S') ?
            <View style={tagStyle(true)}>
              <Text style={styles.tagText} >S1</Text>
            </View> :
            <View style={tagStyle(false)}>
              <Text style={styles.tagText}>U1</Text>
            </View>
          }
        </View>
          <View style={styles.station}>
            <Icon
              name={'ios-play'}
              size={Metrics.icons.medium}
              style={styles.color(this.props.line)}
            />
            <Text style={styles.stationText}>{this.props.station}</Text>
          </View>
      </View>
    )
  }
}

PersonListItem.propTypes = {
  line: React.PropTypes.string,
  station: React.PropTypes.string
}
