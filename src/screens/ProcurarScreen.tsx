import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import{useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'
import CardCarona from '../components/CardCarona';


export function ProcurarScreen() {


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

  const navigation = useNavigation();

 

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 40, backgroundColor: '#6000AC', height: 134 }}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={40}
          color="white"
          style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 30 }}
          onPress={() => navigation.navigate('home')}
        />
        <Text style={styles.textTitulo}>Procurar Carona</Text>
      </View>

        <View style={{alignItems:'center', justifyContent: 'center', marginBottom: 20, marginTop:20}}>

            <TouchableOpacity onPress={() => navigation.navigate('modalC')}>
                <CardCarona foto={''} nome={''} destino={''} distancia={''} tempoChegada={''} placa={''} modeloCarro={''} assentosDisponiveis={0}      
            />
            </TouchableOpacity>

        </View>
      

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textTitulo: {
    fontSize: 27,
    lineHeight: 32,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fdfcff',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 233,
  }
});

export default ProcurarScreen;