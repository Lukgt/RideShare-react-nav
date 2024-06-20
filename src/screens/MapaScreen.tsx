import React from 'react';
import { StyleSheet,View, Text, Image } from 'react-native';
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
    <View style={{flex:1, backgroundColor: 'white'}}>
        <View style={{backgroundColor:'#6000AC', height:134, alignItems:'center',justifyContent:'flex-end'}}>
            <Text style={styles.textMapa}>Mapa</Text>
        </View>
        
        <StatusBar style='auto'/>
    </View>
  );
}

const styles = StyleSheet.create({
    textMapa: {
    fontSize: 27,
    lineHeight: 32,
    fontWeight: "700",
    color: "#fdfcff",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 233,
    marginBottom: 20
    }
    });