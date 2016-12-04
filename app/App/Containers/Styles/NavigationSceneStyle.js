import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  view: {
    backgroundColor: 'blue'
  },
  stationInput: {
    backgroundColor: Colors.bvgGray,
    flex: 1
  }
})
