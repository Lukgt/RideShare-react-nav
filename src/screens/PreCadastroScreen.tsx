import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import{useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'



export function PreCadastroScreen() {


    
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
    <View style={{flex:1, backgroundColor: '#FFFFFF'}}>

        <View style={{flexDirection:'row',alignItems: 'center',marginTop:60, marginLeft:16}}>
            
            <Text style={styles.textTituloPreCadastro}>Como você quer viajar com a gente?</Text>

        </View>

        <View style={{alignItems:'center', justifyContent:'center', gap:10}}>
            {/* CARD PASSAGEIRO*/}
            <TouchableOpacity
                onPress={()=> navigation.navigate('cadastroC')}
            >  
                <View style={{backgroundColor:'#F5EEFF', width:320, height:151, borderRadius:10,  alignItems:'center', marginTop:100}}>
                
                    <Text style={styles.textCard}>Passageiro</Text>

                    <Text style={styles.textSubCard}>Quero solicitar caronas  para o trabalho</Text>

                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Image
                        style={{position:'relative', right:90, bottom:40}}
                        source={require('../../assets/Order_ride.png')}
                        />
                        <MaterialCommunityIcons name="arrow-right" size={40} color="#4f008e" style={{position:'relative', left: 70, top: 10 }} />
                    </View>

                </View>
            </TouchableOpacity>
            {/* CARD MOTORISTA */}
            <TouchableOpacity
                onPress={()=> navigation.navigate('cadastroM')}
            >  
                <View style={{backgroundColor:'#F5EEFF', width:320, height:151, borderRadius:10,  alignItems:'center', marginTop:50}}>
                
                    <Text style={styles.textCard}>Motorista</Text>

                    <Text style={styles.textSubCard}>Quero oferecer caronas para o trabalho</Text>

                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Image
                        style={{position:'relative', right:90, bottom:40}}
                        source={require('../../assets/driving_car.png')}
                        />
                        <MaterialCommunityIcons name="arrow-right" size={40} color="#4f008e" style={{position:'relative', left: 70, top: 10 }} />
                    </View>

                </View>
            </TouchableOpacity>
        </View>
            
        
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center', gap:5 ,marginTop:120}}>
            <Text style={styles.textEsqueceuSenha}>Já tem conta?</Text>

            <TouchableOpacity
            onPress={()=> navigation.navigate('login')}
            >
                <Text style={styles.textCadastro}>Faça login</Text>
             </TouchableOpacity> 
        </View>   
        
        
        <StatusBar style='auto'/>
    </View>
  );
}


const styles = StyleSheet.create({
    textTitulo:{
        color: "#fdfcff",
        fontFamily: "Poppins_700Bold",
        fontSize: 32,
        lineHeight: 38,
        marginBottom:10
    },
    textSubTitulo:{
        color: "#fdfcff",
        fontSize: 23,
        lineHeight: 28,
        fontFamily: "Poppins_500Medium"
    },
    textTituloPreCadastro: {
        fontSize: 23,
        lineHeight: 28,
        fontFamily: "Poppins_500Medium",
        color: "#7c36cf",
        textAlign: "left",
        display: "flex",
        width: 220,
        },
    
    textEsqueceuSenha:{
        fontSize: 12,
        lineHeight: 14,
        fontFamily: "Poppins-Regular",
        color: "#1e1f24",
        textAlign: "left"
    },
    textCadastro:{
        fontSize: 12,
        lineHeight: 14,
        fontFamily: "Poppins_700Bold",
        color: "#7C36CF",
        textAlign: "left"
    },
    textCard:{
        fontSize: 23,
        lineHeight: 28,
        fontFamily: "Poppins_500Medium",
        color: "#7c36cf",
        textAlign: "left",
        marginTop: 10
    },
    textSubCard:{
        fontSize: 12,
        lineHeight: 14,
        fontFamily: "Poppins_400Regular",
        color: "#4f008e",
        textAlign: "center",
        display: "flex",
        width: 153,
        zIndex: 0,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    }
});