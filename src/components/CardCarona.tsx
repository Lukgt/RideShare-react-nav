import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import{useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'

interface CardCaronaProps {
  foto: string;
  nome: string;
  destino: string;
  distancia: string;
  tempoChegada: string;
  placa: string;
  modeloCarro: string;
  assentosDisponiveis: number;
}

const CardCarona: React.FC<CardCaronaProps> = ({
  foto,
  nome,
  destino,
  distancia,
  tempoChegada,
  placa,
  modeloCarro,
  assentosDisponiveis,
}) => {
  return (
    <View style={estilos.card}>
      <Image source={{ uri: foto }} style={estilos.foto} />
      <View style={estilos.info}>
        <Text style={estilos.nome}>{nome}</Text>
        <Text style={estilos.texto}>Destino: {destino}</Text>
        <Text style={estilos.texto}>Distância: {distancia}</Text>
        <Text style={estilos.texto}>Tempo de Chegada: {tempoChegada}</Text>
        <Text style={estilos.texto}>Placa: {placa}</Text>
        <Text style={estilos.texto}>Modelo do Carro: {modeloCarro}</Text>
        <Text style={estilos.texto}>Assentos Disponíveis: {assentosDisponiveis}</Text>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F5EEFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
    width: 360,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  info: {
    flex: 1,
    marginLeft:40,
    justifyContent: 'center',
    marginBottom: 20
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 14,
    color: '#666',
  },
});

export default CardCarona;