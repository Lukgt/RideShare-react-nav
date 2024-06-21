import React, { useState } from 'react';
import { ScrollView,View, Text, Image, StyleSheet, Linking, Alert } from 'react-native';
import { BotaoEntrar, BotaoPrincipal } from './Botao';
import { BotaoCarona } from './BotaoHome';
import{useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins';


interface ModalMotoristaProps {
  foto: string;
  nome: string;
  destino: string;
  distancia: string;
  tempoEncontro: string;
  setor?: string;
}

  const generateWhatsAppLink = () => {
    const phoneNumber = '+5511999999999'; // Substitute with the desired phone number
    const textMessage = `Olá.`; // Substitute with the desired message
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(textMessage)}`;
    Linking.openURL(url)
      .catch((err) => Alert.alert('Error opening WhatsApp:', err.message));
  };

const ModalMotorista: React.FC<ModalMotoristaProps> = ({
  foto,
  nome,
  destino,
  distancia,
  tempoEncontro,
  setor,
}) => {
  return (
    <ScrollView>
        <View style={{alignItems:'center',justifyContent:'center'}}>

            <Image source={{ uri: foto }} style={styles.foto} />
                <Text style={styles.nome}>{nome}</Text>

            <View style={[styles.info, styles.card]}> 
                <Text style={styles.texto}>Setor: {setor}</Text>

                <Text style={{height:1,width:'80%',borderWidth:1,borderColor:'#3e176b', marginBottom:10}}></Text>
                
                <Text style={styles.textoDestino}>📍{destino}</Text>
                <Text style={styles.texto}>Distância: {distancia}</Text>
                <Text style={styles.texto}>Tempo de Encontro: {tempoEncontro}</Text>
            </View>
            <View style={{marginTop:40, gap:20}}>
                <Text style={styles.textoSolicitacao}>Gostaria de aceitar essa solicitação?</Text>
                <BotaoPrincipal title={'Aceitar'} onPress={generateWhatsAppLink}/>
                <BotaoEntrar title={'Rejeitar'}/>
            </View>
            

        </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#F5EEFF',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
    width: 340,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 10,
    borderWidth: 2,
    borderColor:'black',
    marginTop: 30
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    margin:15,
  },
  texto: {
    fontSize: 16,
    lineHeight: 19,
    color: "#3e176b",
    textAlign: "left",
    marginBottom: 10
  },
  textoDestino: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "700",
    fontFamily: "Poppins-600Medium",
    color: "#3e176b",
    textAlign: "left",
    marginBottom:10
  },
  textoSolicitacao:{
    fontSize: 16,
    lineHeight: 19,
    color: "#6000ac",
    textAlign: "center"
  }
});

export default ModalMotorista;