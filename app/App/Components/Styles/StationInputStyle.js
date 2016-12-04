import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default {
  ...ApplicationStyles.screen,
  view: {
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  seperator:{
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  stationInput: {
    height: 25,
    color: "white",
  }
}
