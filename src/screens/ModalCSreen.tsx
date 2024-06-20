import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ModalCarona from '../components/ModalCarona';
import { View } from 'react-native';


export function ModalCScreen() {

  const navigation = useNavigation();

  return (
    <>
        <View style={{alignSelf: 'flex-start', marginTop:20}}>
                <MaterialCommunityIcons
                name="arrow-left"
                size={40}
                color="#3e176b"
                style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 30 }}
                onPress={() => navigation.navigate('home')}
                />
        </View>
        
        <ModalCarona foto={''} nome={''} destino={''} distancia={''} tempoChegada={''} placa={''} modeloCarro={''} assentosDisponiveis={0}/>
    </>
  );
}

