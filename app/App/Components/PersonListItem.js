import React from 'react'
import { Image, Text, View, TouchableHighlight } from 'react-native'
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
      <TouchableHighlight onPress={this.props.selected}>
        <View style={styles.view}>
          <View style={styles.personImageWrapper}>
            <Image style={styles.personImage} source={{uri: this.props.person.image}}/>
          </View>
          <View style={styles.info}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.header}>{this.props.person.name}</Text>
              </View>
              <View style={styles.headerWrapper}>
                <Text style={styles.subHeade}>{this.props.person.lookingFor}</Text>
              </View>
            </View>
            <View style={styles.tags}>
              {
                this.props.person.tags.map( (tag) => (
                  <Text style={styles.tag} >#{tag}</Text>
                ) )
              }
            </View>
            <View style={styles.tags}>
              {
                this.props.person.shortTags.map( (tag) => (
                  <Text style={styles.shortTag} >#{tag}</Text>
                ) )
              }
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

PersonListItem.propTypes = {
  person: React.PropTypes.object,
}
