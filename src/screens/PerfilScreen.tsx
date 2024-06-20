import React from 'react';
import { StyleSheet,View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export function PerfilScreen() {
  return (
    <View style={{flex:1, backgroundColor: 'white'}}>
        <View style={{backgroundColor:'#6000AC', height:134, alignItems:'center',justifyContent:'flex-end'}}>
            <Text style={styles.textPerfil}>Perfil</Text>
        </View>
        <View style={{alignItems:'center',justifyContent:'flex-end'}}>
            <Image
                style={{borderRadius:100, height:100, width:100, marginTop:30}}
                source={require('../../assets/account.png')}
            />
        </View>
        <StatusBar style='auto'/>
    </View>
  );
}

const styles = StyleSheet.create({
    textPerfil: {
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