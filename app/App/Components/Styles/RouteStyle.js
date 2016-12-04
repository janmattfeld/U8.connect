'use strict'

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default {
  view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.bvgYellowDark,
    padding: Metrics.baseMargin,
    borderBottomWidth: 3,
    margin: Metrics.baseMargin,
    maxHeight: 70
  },
  tagWrapper: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
    paddingTop: 3
  },
  tag: {
    padding: 2,
    paddingLeft: 3,
    paddingRight: 3,
    width: 40,
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
  },
  sbahn: {
    borderRadius: 15
  },
  ubahn: {
    
  },
  tagText: {
    fontSize: Metrics.text.small,
    letterSpacing: 2,
    color: 'white',
  },
  station: {
    flex: 6,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: 'row',
  },
  stationText: {
    fontSize: Metrics.text.small,
    paddingLeft: Metrics.baseMargin,
    paddingBottom: 5
  },
  icon: {
    
  },
  color: (line) => {
    let number = line.substring(1, line.length)
    if(line.toUpperCase().startsWith('S')){
      return {
        color: Colors.sbahn[number] ? Colors.sbahn[number] : 'gray'
      }
    }else{
      return {
        color: Colors.ubahn[number] ? Colors.ubahn[number] : 'gray'
      }
    }
  },
  colorBg: (line) => {
    let number = line.substring(1, line.length)
    if(line.toUpperCase().startsWith('S')){
      return {
        backgroundColor: Colors.sbahn[number] ? Colors.sbahn[number] : 'gray'
      }
    }else{
      return {
        backgroundColor: Colors.ubahn[number] ? Colors.ubahn[number] : 'gray'
      }
    }
  }
}
