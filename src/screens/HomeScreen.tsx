import React, { useRef, useState } from 'react';
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { BotaoCarona, BotaoMotorista } from '../components/BotaoHome';
import { BotaoPrincipal } from '../components/Botao';

import CardCarona from '../components/CardCarona';
import CardMotorista from '../components/CardMotorista';

import { Modalize } from 'react-native-modalize';
import ModalCarona from '../components/ModalCarona';
import ModalMotorista from '../components/ModalMotorista';

export function HomeScreen() {
  const [formType, setFormType] = useState('carona'); // Estado inicial: 'carona' selecionado
  const navigation = useNavigation();
  const [numAssentos, setNumAssentos] = useState(0); // Estado inicial do número de assentos

  const incrementarAssentos = () => {
    if (numAssentos < 4) {
      setNumAssentos(numAssentos + 1);
    }
  };

  const decrementarAssentos = () => {
    if (numAssentos > 0) {
      setNumAssentos(numAssentos - 1);
    }
  };

// Modal dos Cards
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

// Troca de tela dos botoes
  const renderForm = () => {
    if (formType === 'carona') {
      return (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder='De:'
            textContentType='location'
          />
          <TextInput
            style={styles.input}
            placeholder='Para:'
            textContentType='location'
          />
          <View style={styles.row}>
            <TextInput
              style={styles.input2}
              placeholder='Data:'
            />
            <TextInput
              style={styles.input2}
              placeholder='Hora:'
            />
          </View>
          <BotaoPrincipal
            title='Procurar'
          />
        </View>
      );
    } else if (formType === 'motorista') {
      return (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder='Para:'
            textContentType='location'
          />
          <View style={styles.row}>
            <TextInput
              style={styles.input2}
              placeholder='Data de partida:'
            />
            <TextInput
              style={styles.input2}
              placeholder='Hora de partida:'
            />
          </View>
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>Assentos disponíveis</Text>

            <TouchableOpacity onPress={decrementarAssentos} style={styles.counterButton}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.counterText}>{numAssentos}</Text>

            <TouchableOpacity onPress={incrementarAssentos} style={styles.counterButton}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

          </View>
          <BotaoPrincipal
            title='Procurar'
          />
        </View>
      );
    }
  };

  //corpo principal
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/vamos.png')}
        />
        <Image
          source={require('../../assets/account.png')}
        />
      </View>
      <View style={styles.greetingContainer}>
        <Text style={styles.textOla}>Olá, user!</Text>
        <Text style={styles.textOla}>Seja bem-vindo!</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <BotaoCarona
          title='Carona'
          onPress={() => setFormType('carona')}
          isSelected={formType === 'carona'} // Verifica se 'carona' está selecionado
        />
        <BotaoMotorista
          title='Motorista'
          onPress={() => setFormType('motorista')}
          isSelected={formType === 'motorista'} // Verifica se 'motorista' está selecionado

        />
      </View>
      {renderForm()}
      <View style={styles.suggestionsContainer}>
        <Text style={styles.textHome}>
          Sugestões de caronas
        </Text>
      </View>

      <View style={{alignItems:'center', justifyContent: 'center', marginBottom: 20, marginTop:20}}>

        <TouchableOpacity onPress={() => navigation.navigate('modalC')}>
          <CardCarona foto={''} nome={''} destino={''} distancia={''} tempoChegada={''} placa={''} modeloCarro={''} assentosDisponiveis={0}      
          />
        </TouchableOpacity>

      </View>
      
      <View style={{alignItems:'center', justifyContent: 'center', marginBottom: 20, marginTop:10}}>
      
      <TouchableOpacity onPress={() => navigation.navigate('modalM')}>
        <CardMotorista foto={''} nome={''} destino={''} setor={''} tempoEncontro={''}/>
      </TouchableOpacity>


      </View>

      <StatusBar style='auto' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 40,
    backgroundColor: '#6000AC',
    height: 134,
    paddingTop: 30,
  },
  greetingContainer: {
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
    marginTop: 20,
  },
  formContainer: {
    backgroundColor: '#F5EEFF',
    height: 290,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    gap: 20,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
  textOla: {
    fontSize: 18,
    lineHeight: 19,
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    color: "#7c36cf",
    textAlign: "left",
    width: 136,
    marginLeft: 20,
  },
  textHome: {
    fontSize: 18,
    lineHeight: 19,
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    color: "#3e176b",
    textAlign: "left",
  },
  input: {
    borderRadius: 5,
    backgroundColor: '#fcfcfd',
    borderStyle: 'solid',
    borderColor: '#cdced7',
    borderWidth: 1,
    width: '85%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 32,
  },
  input2: {
    borderRadius: 5,
    backgroundColor: '#fcfcfd',
    borderStyle: 'solid',
    borderColor: '#cdced7',
    borderWidth: 1,
    width: '45%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  suggestionsContainer: {
    alignItems: 'flex-start',
    marginTop: 30,
    marginLeft: 25,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'flex-end',
    marginRight:30,
    marginTop: 10,
  },
  counterButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#cdced7',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  counterText: {
    fontSize: 20,
    marginHorizontal: 25,
  },
});

export default HomeScreen;
