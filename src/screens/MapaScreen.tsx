import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import{useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'


export function MapaScreen() {


  const[fontsLoad]=useFonts({
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_600SemiBold, 
    Poppins_700Bold, 
    Poppins_800ExtraBold 
   });
 
   if(!fontsLoad){
    return null;
   }
   
  return (
    <View style={{flex:1, backgroundColor: 'yellow'}}>
        <Text>Gallery Works!!</Text>
        <StatusBar style='auto'/>
    </View>
  );
}