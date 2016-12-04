'use strict'

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default {
  view: {
    flex: 0,
    flexDirection: 'row',
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
    height: 70,
    width: 70,
    borderRadius: 35
  },
  headerWrapper: {
    flex: 0,
    justifyContent: 'flex-start',
    paddingTop: 4
  },
  header: {
    flex: 1,
    fontSize: Metrics.text.small,
    marginBottom: Metrics.baseMargin,
    justifyContent: 'flex-end'
  },
  subHeader: {
    flex: 1,
    fontSize: Metrics.text.small,
    marginBottom: Metrics.baseMargin,
    justifyContent: 'flex-end',
    color: Colors.charcoal,
    fontWeight: 100
  },
  tags: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    marginBottom: Metrics.baseMargin,
    overflow: 'hidden'
  },
  tag: {
    marginRight: 3
  },
  shortTag: {
    marginRight: 3,
    color: Colors.charcoal,
    fontWeight: "100"
  }
}
