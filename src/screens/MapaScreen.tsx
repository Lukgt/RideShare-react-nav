import React from 'react';
import { StyleSheet,View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export function MapaScreen() {
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