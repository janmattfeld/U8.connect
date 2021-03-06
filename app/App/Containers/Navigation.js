import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, Navigator, TouchableHighlight, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { popScene } from '../Reducers/action'

// Scenes
import Connect from './ConnectScreen'
import Start from './StartScene'

// Styles
import styles from './Styles/RootContainerStyle'
import {Metrics, Colors} from '../Themes'
import {Scenes} from '../Constants/'

class Navigation extends Component {
  componentWillMount () {
    this.renderScene = this.renderScene.bind(this)
    this.renderNavBar = this.renderNavBar.bind(this)
    this.navigationRouteMapper = this.navigationRouteMapper.bind(this)
  }

  componentDidMount () {
  }

  componentWillReceiveProps(nextProps) {
    // console.log("Receives new Props: ", nextProps.scene, this.props.lastAction)
    if(nextProps.scene != this.props.scene && nextProps.lastAction != 'POP_SCENE'){
      if(this.props.scene == Scenes.roleSelect)
        this.navigator.pop()

      this.navigator.push({
          component: nextProps.scene,
          passProps: {
            // title: nextProps.scene.title ? nextProps.scene.title : ''
            ...nextProps.props
          }
        })
    }else if(nextProps.lastAction == 'POP_SCENE'){
      console.log("++++++++++++++++++++++++++++ POP in Navigation")
      this.navigator.pop()
    }
  }

  renderScene (route, navigator) {
    console.log("----------------- RENDER SCENE --------------------------", route.component)
    switch (route.component) {
      case Scenes.connect:
        return <Connect navigator={navigator} {...route.passProps} />
      case Scenes.start:
        return <Start navigator={navigator} {...route.passProps} />
      default:
        return <Connect navigator={navigator} {...route.passProps} /> 
    }
  }

  configureScene(route, routeStack) {
    const NoBackSwipe ={
      ...Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {
          pop: {},
        },
    };
    return NoBackSwipe
    // return Navigator.SceneConfigs.HorizontalSwipeJump
  }

  navigationRouteMapper () {
    let back = (navigator) => {
      let stack = navigator.getCurrentRoutes()
      let newScene = stack[stack.length-2]
      console.log("Last Scene: ", newScene)
      this.props.popScene(newScene.component)
    }
    return {
      LeftButton (route, navigator, index, navState) {
        if (index > 1) {
          return (
            <TouchableHighlight
              underlayColor='transparent'
              onPress={() => { if (index > 0) { back(navigator) } }}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <Icon name='ios-arrow-back' size={20} color={'#ffffff'} style={{marginTop: 2, paddingRight: 5, paddingLeft: 10}} />
                <Text style={styles.topBarLeft}>Back</Text>
              </View>
            </TouchableHighlight>)
        } else {
          return null
        }
      },
      RightButton (route, navigator, index, navState) {
        if (route.onPress) {
          return (
            <TouchableHighlight
              underlayColor={'#425574'}
              onPress={() => route.onPress()}>
              <Text style={{flexDirection: 'row', alignItems: 'center', marginTop: 8, marginRight: 14, color: 'white'}}>
                { route.rightText || 'Right Button' }
              </Text>
            </TouchableHighlight>)
        }
      },
      Title (route, navigator, index, navState) {
        if(route && route.passProps && route.passProps.title)
          return <Text style={{marginTop: 10, fontWeight: 'bold', color: 'white'}}>{route.passProps.title}</Text>
      }
    }
  }

  renderNavBar() {
    // let ignore = [Scenes.roleSelect, Scenes.start]

    // if(ignore.indexOf(this.props.scene) == -1)
    //   return <Navigator.NavigationBar
    //           style={styles.nav}
    //           routeMapper={this.navigationRouteMapper()} />
  }

  render () {
    let initialScene = this.props.scene
    let sceneStyle = () => {
      return {
        paddingTop: Metrics.statusBarHeight
      }
    }

    return (
      <Navigator
        configureScene={this.configureScene}
        sceneStyle={sceneStyle()}
        navigationBar={this.renderNavBar()}
        initialRouteStack={[{ component: Scenes.start }]}
        renderScene={this.renderScene}
        ref={(nav) => this.navigator = nav}
      />
    )
  }
}

Navigation.propTypes = {
  scene: PropTypes.string
}

const mapStateToDispatch = dispatch => ({
  // startup: () => dispatch(StartupActions.startup())
  popScene: (name) => dispatch( popScene({name}) )
})

const mapStateToProps = (state, _) => ({
  scene: state.navigation.scene,
  props: state.navigation.props,
  showNavbar: state.navigation.showNavbar,
  lastAction: state.lastAction.type,
})

export default connect(mapStateToProps, mapStateToDispatch)(Navigation)



/**
 *
  }
 *
 *
 *
 */
