import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Animated, Image, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import Ripple from './Ripple';

class Fab extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      type: null,
    }
  }

  animation = new Animated.Value(0);
  opacity = new Animated.Value(0);

  toggleMenu(){
    const toValue = this.open ? 0 : 1;

    Animated.parallel([
      Animated.timing(this.opacity, {
        toValue,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.spring(this.animation, {
        toValue,
        friction: 6,
        useNativeDriver: true
      })
    ]).start();

    this.open = !this.open;
  }

  handleOptions(name) {
    if(this.props.onPress) {
      this.props.onPress(name);
    }
    return this.toggleMenu();
  }

  renderOptions() {
    const firstStyle = {
      transform: [
        { 
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -55],
          })
        }
      ]
    }

    const secondStyle = {
        transform: [
        { 
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -105]
          }) 
        }
      ]
    }

    if(this.props.actions.length > 1) {
      let output = 0;
      return this.props.actions.map((item, index) => {
        if(index > 0 ){
          output = output - 55;
          return (
            <Animated.View key={index} style={[styles.button, {backgroundColor: item.color}, styles.small, {
              transform: [
                { 
                  translateY: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, output]
                  }) 
                }
              ]}]}>
              <Ripple 
                style={styles.small}
                rippleContainerBorderRadius={22}
                onPress={()=>this.handleOptions(item.name)}>
                {item.icon}
              </Ripple>

            {item.text &&
              <Animated.Text style={[this.props.style, {bottom: 3, marginHorizontal: 5, opacity: this.opacity}, styles.label]}>{item.text}</Animated.Text>
            }
            </Animated.View>
          )
        }
      })
    }
  }

  render() {

    let degrees = (this.props.rotation) ? this.props.rotation : "45deg";

    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [ "0deg", degrees],
          })
        }
      ]
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderOptions()}

        <Ripple 
          rippleColor={"#FFF"}
          style={[styles.button, {backgroundColor: this.props.actions[0].color}, styles.normal]}
          rippleContainerBorderRadius={30}
          onPress={()=>this.toggleMenu()}>
          
          <Animated.View style={rotation}>
            {this.props.actions[0].icon}
          </Animated.View>
        </Ripple>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 5,
  },
  normal: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  small: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    width: 136, 
    position: 'absolute', 
    padding: 8, 
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    borderRadius: 70,
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  }
}); 

export default Fab;