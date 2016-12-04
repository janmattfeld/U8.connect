'use strict'

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default {
  view: {
    flex: 0,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    padding: Metrics.doubleBaseMargin,
  },
  info: {
    padding: Metrics.baseMargin,
    paddingTop: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
    overflow: 'hidden'
  },
  personImageWrapper: {
  },
  personImage: {
    marginLeft: (Metrics.screenWidth-200-(Metrics.doubleBaseMargin*2))/2,
    height: 200,
    width: 200,
    borderRadius: 100
  },
  headerWrapper: {
    marginTop: Metrics.baseMargin,
    flex: 0,
    justifyContent: 'flex-start',
    paddingTop: 4
  },
  header: {
    marginTop: Metrics.baseMargin*4,
    flex: 1,
    fontSize: Metrics.text.small,
    marginBottom: Metrics.baseMargin,
    justifyContent: 'flex-end'
  },
  subHeader: {
    flex: 1,
    fontSize: Metrics.text.tiny,
    marginBottom: Metrics.baseMargin,
    justifyContent: 'flex-end',
    color: Colors.lightGray
  },
  tags: {
    marginTop: Metrics.baseMargin,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    marginBottom: Metrics.baseMargin,
    overflow: 'hidden'
  },
  tag: {
    marginTop: Metrics.baseMargin,
    marginRight: 3,
    color: Colors.lightGray
  },
  shortTag: {
    fontSize: Metrics.text.small,
    marginTop: Metrics.baseMargin,
    marginRight: 3
  }
}
