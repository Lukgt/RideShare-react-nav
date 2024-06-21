import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BotaoCarona, BotaoMotorista } from '../components/BotaoHome';
import { BotaoPrincipal } from '../components/Botao';

import CardCarona from '../components/CardCarona';
import CardMotorista from '../components/CardMotorista';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins';

export function HomeScreen() {


  const [formType, setFormType] = useState('carona'); // Estado inicial: 'carona' selecionado
  const [numAssentos, setNumAssentos] = useState(0); // Estado inicial do número de assentos
  const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
  const [userCompany, setUserCompany] = useState(''); // Estado para armazenar a empresa do usuário
  const navigation = useNavigation();

  // Carregar nome e empresa do usuário ao carregar a tela
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userNameStored = await AsyncStorage.getItem('nome');
        const userCompanyStored = await AsyncStorage.getItem('empresa');

        if (userNameStored !== null && userCompanyStored !== null) {
          setUserName(userNameStored);
          setUserCompany(userCompanyStored);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleProcurar = async () => {
    let endpoint = '';
    let alertMessage = '';

    if (formType === 'carona') {
      endpoint = 'https://backend-rideshare.onrender.com/agendamento/register';
      alertMessage = 'Agendamento de carona criado com sucesso!';
    } else if (formType === 'motorista') {
      endpoint = 'https://backend-rideshare.onrender.com/agendamentoMotorista/register';
      alertMessage = 'Agendamento de motorista criado com sucesso!';
    }

    const dadosAgendamento = {
      userName,
      userCompany,
      formType,
      numAssentos
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAgendamento),
      });

      if (response.ok) {
        Alert.alert(alertMessage);
        navigation.navigate(formType === 'carona' ? 'modalC' : 'modalM');
      } else {
        Alert.alert('Erro ao criar agendamento. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      Alert.alert('Erro no servidor. Tente novamente mais tarde.');
    }
  };

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

  // Função para renderizar o formulário com base no tipo selecionado (carona ou motorista)
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
            value={userCompany} // Define o valor inicial como o nome da empresa
            editable={false} // Impede a edição pelo usuário
            textContentType='none' // Remove sugestões de preenchimento automático
          />
          <View style={styles.row}>

            <DatePicker/>
            {/* <TextInput
              style={styles.input2}
              placeholder='Data:'
            />
            <TextInput
              style={styles.input2}
              placeholder='Hora:'
            /> */}
          </View>
          <BotaoPrincipal
            title='Procurar'
            onPress={handleProcurar}
          />
        </View>
      );
    } else if (formType === 'motorista') {
      return (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder='Para:'
            value={userCompany} // Define o valor inicial como o nome da empresa
            editable={false} // Impede a edição pelo usuário
            textContentType='none' // Remove sugestões de preenchimento automático
          />
          <View style={styles.row}>

            <DatePicker/>
            {/* <TextInput
              style={styles.input2}
              placeholder='Data de partida:'
            />
            <TextInput
              style={styles.input2}
              placeholder='Hora de partida:'
            /> */}
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
            onPress={handleProcurar}
          />
        </View>
      );
    }
  };

  // Renderização principal
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
        <Text style={styles.textOla}>Olá, {userName}!</Text>
        <Text style={styles.textOla}>da empresa {userCompany}!</Text>
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

      {/* Exemplo de cards */}
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('modalC')}>
          <Text>Card de Carona</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('modalM')}>
          <Text>Card de Motorista</Text>
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
    height: 340,
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
    fontFamily: 'Poppins_500Medium',
    color: '#7c36cf',
    textAlign: 'left',
    width: 160,
    marginLeft: 20,
  },
  textHome: {
    fontSize: 18,
    lineHeight: 19,
    fontFamily: 'Poppins_500Medium',
    color: '#3e176b',
    textAlign: 'left',
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
    alignSelf: 'flex-end',
    marginRight: 30,
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
