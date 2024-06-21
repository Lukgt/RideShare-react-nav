import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { BotaoCarona, BotaoMotorista } from '../components/BotaoHome';
import { BotaoPrincipal } from '../components/Botao';
import CardCarona from '../components/CardCarona';
import CardMotorista from '../components/CardMotorista';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';

export function HomeScreen() {
  const [formType, setFormType] = useState('carona');
  const [numAssentos, setNumAssentos] = useState(0);
  const [userName, setUserName] = useState('');
  const [userCompany, setUserCompany] = useState('');
  const [partida, setPartida] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [vagas, setVagas] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  const fetchUserData = async () => {
    try {
      const userNameStored = await AsyncStorage.getItem('nome');
      const userCompanyStored = await AsyncStorage.getItem('empresa');
      const storedProfileImage = await AsyncStorage.getItem('@profile_image_uri');

      if (userNameStored !== null) {
        setUserName(userNameStored);
      }
      if (userCompanyStored !== null) {
        setUserCompany(userCompanyStored);
      }
      if (storedProfileImage !== null) {
        setProfileImage(storedProfileImage);
      }
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  if (!fontsLoaded || loading) {
    return null;
  }

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

  const handleProcurar = async () => {
    if (!partida || (formType === 'carona' && !destino) || !data || !hora || !userCompany) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    let agendamentoData = {
      partida,
      empresa: userCompany,
      data,
      hora,
    };

    if (formType === 'carona') {
      agendamentoData.destino = destino;
    } else if (formType === 'motorista') {
      agendamentoData.vagas = vagas;
    }

    console.log('Dados de agendamento antes da requisição:', agendamentoData);

    try {
      let response;
      if (formType === 'carona') {
        response = await axios.post('https://backend-rideshare.onrender.com/agendamento/register', agendamentoData);
        console.log('Resposta do servidor (carona):', response.data);
        if (response.status === 201) {
          Alert.alert('Agendamento de carona criado com sucesso!');
          setPartida('');
          setDestino('');
          setData('');
          setHora('');
          navigation.navigate('modalC'); // Navega para modalC após sucesso
        } else {
          Alert.alert('Erro ao criar agendamento de carona. Tente novamente mais tarde.');
        }
      } else if (formType === 'motorista') {
        response = await axios.post('https://backend-rideshare.onrender.com/agendamentoMotorista/register', agendamentoData);
        console.log('Resposta do servidor (motorista):', response.data);
        if (response.status === 201) {
          Alert.alert('Agendamento de motorista criado com sucesso!');
          setPartida('');
          setData('');
          setHora('');
          setVagas(0);
          navigation.navigate('modalM'); // Navega para modalM após sucesso
        } else {
          Alert.alert('Erro ao criar agendamento de motorista. Tente novamente mais tarde.');
        }
      }
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      Alert.alert('Erro no servidor. Tente novamente mais tarde.');
    }
  };

  const renderForm = () => {
    if (formType === 'carona') {
      return (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder='De:'
            value={partida}
            onChangeText={setPartida}
            textContentType='location'
          />
          <TextInput
            style={styles.input}
            placeholder='Para:'
            value={destino}
            onChangeText={setDestino}
            textContentType='none'
          />
          <View style={styles.row}>
            <TextInput
              style={styles.input2}
              placeholder='Data:'
              value={data}
              onChangeText={setData}
            />
            <TextInput
              style={styles.input2}
              placeholder='Hora:'
              value={hora}
              onChangeText={setHora}
            />
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
            value={userCompany}
            onChangeText={setUserCompany}
            textContentType='none'
          />
          <View style={styles.row}>
            <TextInput
              style={styles.input2}
              placeholder='Data de partida:'
              value={data}
              onChangeText={setData}
            />
            <TextInput
              style={styles.input2}
              placeholder='Hora de partida:'
              value={hora}
              onChangeText={setHora}
            />
          </View>
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>Assentos livres</Text>

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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/vamos.png')}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          {profileImage ? (
            <Image
              style={styles.profileImage}
              source={{ uri: profileImage }}
            />
          ) : (
            <Image
              style={styles.profileImage}
              source={require('../../assets/account.png')}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.greetingContainer}>
        <Text style={styles.textOla}>Olá, {userName}!</Text>
        <Text style={styles.textOla}>da empresa {userCompany}!</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <BotaoCarona
          title='Carona'
          onPress={() => setFormType('carona')}
          isSelected={formType === 'carona'}
        />
        <BotaoMotorista
          title='Motorista'
          onPress={() => setFormType('motorista')}
          isSelected={formType === 'motorista'}
        />
      </View>
      {renderForm()}
      <View style={styles.suggestionsContainer}>
        <Text style={styles.textHome}>
          Sugestões de caronas
        </Text>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 20 }}>

        <TouchableOpacity onPress={() => navigation.navigate('modalC')}>
          <CardCarona foto={''} nome={''} destino={''} distancia={''} tempoChegada={''} placa={''} modeloCarro={''} assentosDisponiveis={0}
          />
        </TouchableOpacity>

      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>

        <TouchableOpacity onPress={() => navigation.navigate('modalM')}>
          <CardMotorista foto={''} nome={''} destino={''} setor={''} tempoEncontro={''} />
        </TouchableOpacity>

      </View>

      <StatusBar style='auto' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6000AC',
  },
  profileImage: {
    borderRadius: 50,
    height: 80,
    width: 80,
    marginBottom: 10,
  },
  greetingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  textOla: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3C3A36',
    fontFamily: 'Poppins_500Medium',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  formContainer: {
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  input2: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  counterText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  counterButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  suggestionsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  textHome: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3C3A36',
  },
});

export default HomeScreen;


