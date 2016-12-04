import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  view: {
  },
  stationInput: {
    // backgroundColor: Colors.bvgGray,
    flex: 1
  },
  listItemView: {
    padding: 10,
    marginLeft: 7,
    marginRight: 7,
    paddingBottom: 15,
    paddingTop: 15,
  }
})
