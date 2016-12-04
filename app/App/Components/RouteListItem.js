import React from 'react'
import { Image, Text, View, TextInput } from 'react-native'
import styles from './Styles/RouteListItemStyle'

// Themes
import {Metrics, Images} from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'

export default class RouteListItem extends React.Component {
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
    let vehicleSource = (type) => {
      switch(type){
        case 'tram':
          return Images.icons.tram
        case 'ubahn':
          return Images.icons.ubahn
        case 'sbahn':
          return Images.icons.sbahn
        case 'faehre':
          return Images.icons.faehre
        case 'metrotram':
          return Images.icons.metrotram
        default:
          return Images.icons.tram
      }
    }
    return (
      <View style={styles.view}>
        <View style={styles.vehicles}>
          {
            this.props.route.transport.map( (vehicle) => (
              <Image style={styles.vehicleIcon} source={vehicleSource(vehicle)}/>
            ))
          }
         </View>
         <View style={styles.time}>
            <Text>Starting { (new Date(this.props.route.startingAt)).toLocaleTimeString().substring(0,5) }</Text>
            <Text> and departures at { (new Date(this.props.route.departureAt)).toLocaleTimeString().substring(0,5) }</Text>
         </View>
      </View>
    )
  }
}

RouteListItem.propTypes = {
  line: React.PropTypes.string,
  station: React.PropTypes.string,
  seperator: React.PropTypes.bool
}
