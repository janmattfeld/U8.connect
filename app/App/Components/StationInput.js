import React from 'react'
import { Image, Text, View, TextInput } from 'react-native'
import styles from './Styles/StationInputStyle'

// Themes
import {Metrics, Images} from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'

export default class StationInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  componentWillMount() {
    this.defaultValue = this.props.value
  }

  getText () {
    const buttonText = this.props.text || this.props.children.toString()
    return buttonText.toUpperCase()
  }

  render () {
    let renderSeperator = () => {
      if(this.props.seperator){
        return {
          ...styles.view,
          ...styles.seperator
        }
      }else{
        return { 
          ...styles.view,
        }
      }
    }
    return (
      <View style={renderSeperator()}>
          <TextInput
            style={styles.stationInput}
            onChangeText={this.props.onChange}
            onChange={() => console.log('onchange')}
            onEndEditing={() => {if(this.props.value == '') this.props.onChange(this.defaultValue)}}
            clearTextOnFocus={true}
            value={this.props.value}/>
      </View>
    )
  }
}

StationInput.propTypes = {
  line: React.PropTypes.string,
  station: React.PropTypes.string,
  seperator: React.PropTypes.bool
}
