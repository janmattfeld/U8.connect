import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default {
  ...ApplicationStyles.screen,
  view: {
    padding: 10,
    marginLeft: 7,
    marginRight: 7,
  },
  vehicles:{
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },
  vehicleIcon: {
    height: 20,
    width: 20,
    marginRight: 10
  },
  time: {
    flex: 1,
    flexDirection: 'row'
  }
}
