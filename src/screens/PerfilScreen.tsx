import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export function PerfilScreen() {
  return (
    <View style={{flex:1, backgroundColor: 'green'}}>
        <Text>Perfil Works!!</Text>
        <StatusBar style='auto'/>
    </View>
  );
}