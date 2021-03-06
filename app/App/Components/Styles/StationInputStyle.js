import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default {
  ...ApplicationStyles.screen,
  view: {
    padding: 10,
    marginLeft: 7,
    marginRight: 7,
  },
  seperator:{
    borderBottomWidth: 3,
    borderColor: Colors.bvgYellowDark,
  },
  stationInput: {
    height: 25,
    color: Colors.bvgGray
  }
}
