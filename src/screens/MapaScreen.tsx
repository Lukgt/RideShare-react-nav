import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export function MapaScreen() {
  return (
    <View style={{flex:1, backgroundColor: 'yellow'}}>
        <Text>Gallery Works!!</Text>
        <StatusBar style='auto'/>
    </View>
  );
}