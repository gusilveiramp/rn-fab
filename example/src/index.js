import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import Fab from 'rn-fab';

import UserIcon from './img/user.png';
import PlusIcon from './img/plus.png';
import StarIcon from './img/star.png';

export default function App() {
  const actions = [
    // Main button - does not need to receive the "text" property.
    {
      icon: <Image source={PlusIcon} style={styles.icon} />,
      name: "btn_plus",
      color: '#2a57c6'
    },
    // Action Buttons - will be displayed when you tap the main button.
    {
      text: null,
      icon: <Image source={UserIcon} style={styles.icon} />,
      name: "btn_detail",
      color: '#ee4343'
    },
    {
      text: null,
      icon: <Image source={StarIcon} style={styles.icon} />,
      name: "btn_favorite",
      color: '#fdce4b'
    }
  ]
  return (
    <View style={styles.container}>
      <Text style={styles.text}>RN Fab Example</Text>
      <Fab
        actions={actions}
        style={{bottom: 120}}
        rotation={"45deg"}
        onPress={name => {
          if(name == "btn_detail"){
            alert(`Hi, you clicked on ${name}`)
          } else if(name == "btn_favorite"){
            alert(`Ah, now it's the ${name}`)
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  icon: {
    resizeMode: 'contain',
    width: 20,
    height: 20
  }
})