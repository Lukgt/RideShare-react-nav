import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import { BotaoEntrar, BotaoPrincipal } from '../components/Botao';


export function StartScreen() {

  const navigation = useNavigation();

  return (
    <View style={{flex:1, backgroundColor: '#6000AC'}}>
      <View style={{alignItems:'flex-start', marginTop:60, marginLeft:20, marginBottom: 60}}>
        <Text style={styles.textTitulo}>Ola!</Text>
        <Text style={styles.textSubTitulo}>Seja bem-vindo ao</Text>
      </View>

      <View style={{alignItems:'center', justifyContent:'center'}}>
        <Image
          source={require('../../assets/rideshare_index.png')}
        />
        <Image
          source={require('../../assets/carrofundoclaro.png')}
        />

      </View>
        
      <View style={{flex:0.5, alignItems:'center', justifyContent:'center', gap:30, marginTop:80}}>

        <BotaoEntrar
          title='Entrar'
          onPress={()=> navigation.navigate('login')}
        />

        <BotaoPrincipal
          title= 'Cadastre-se'
          onPress={()=> navigation.navigate('preCadastro')}
        />

      </View>

        
        <StatusBar style='auto'/>
    </View>
  );
}


const styles = StyleSheet.create({
  textTitulo:{
    color: "#fdfcff",
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700",
    marginBottom:10
  },
  textSubTitulo:{
    color: "#fdfcff",
    fontSize: 23,
    lineHeight: 28,
    fontWeight: "500",
    fontFamily: "Poppins-Medium"
  }
})