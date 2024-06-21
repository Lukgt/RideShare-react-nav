import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { BotaoPrincipal } from '../components/Botao';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-datepicker';

export function LoginScreen() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  // Função para tentar realizar o login em ambas as APIs
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!matricula.trim() || !senha.trim()) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      console.log(`Tentando fazer login com matrícula ${matricula} e senha ${senha}`);

      // Tentar primeiro com a rota /user/login
      const userLoginSuccess = await attemptLogin('https://backend-rideshare.onrender.com/user/login', matricula, senha, false);

      if (userLoginSuccess) {
        return;
      }

      // Tentar com a rota /userMotorista/login
      const motoristaLoginSuccess = await attemptLogin('https://backend-rideshare.onrender.com/userMotorista/login', matricula, senha, true);

      if (motoristaLoginSuccess) {
        return;
      }

      // Se nenhum login for bem-sucedido, exibir erro
      setError('Matrícula ou senha inválidas.');
      Alert.alert('Erro', 'Não foi possível fazer login. Verifique suas credenciais e tente novamente.');
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      setError('Erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
      Alert.alert('Erro', 'Não foi possível fazer login. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função auxiliar para realizar o login em uma API específica
  const attemptLogin = async (url, matricula, senha, isMotorista) => {
    try {
      console.log(`Tentando fazer login com URL: ${url}`);
      console.log('Dados de login:', { matricula, senha });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matricula: matricula,
          senha: senha,
        }),
      });

      const data = await response.json();
      console.log('Resposta da API:', data);

      if (!response.ok) {
        if (data.msg === 'Usuário não encontrado') {
          // Retorna falso se o usuário não for encontrado, mas não lança um erro
          return false;
        } else {
          throw new Error(data.msg || 'Erro ao tentar fazer login');
        }
      }

      // Salvar token no AsyncStorage
      await AsyncStorage.setItem('token', data.token);

      // Obter informações adicionais do usuário usando o token
      const userId = data.userId;
      const userEndpoint = isMotorista ? 'userMotorista' : 'user';

      // Solicitar nome do usuário
      const nameResponse = await fetch(`https://backend-rideshare.onrender.com/${userEndpoint}/${userId}/nome`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.token}`,
        },
      });

      if (!nameResponse.ok) {
        throw new Error('Erro ao obter o nome do usuário');
      }

      const nameData = await nameResponse.json();

      // Solicitar nome da empresa
      const empresaResponse = await fetch(`https://backend-rideshare.onrender.com/${userEndpoint}/${userId}/empresa`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.token}`,
        },
      });

      if (!empresaResponse.ok) {
        throw new Error('Erro ao obter o nome da empresa');
      }

      const empresaData = await empresaResponse.json();

      // Salvar o nome do usuário e da empresa no AsyncStorage
      await AsyncStorage.setItem('nome', nameData.nome);
      await AsyncStorage.setItem('empresa', empresaData.empresa);

      // Verificar se os dados foram salvos corretamente no AsyncStorage
      const nomeSalvo = await AsyncStorage.getItem('nome');
      const empresaSalva = await AsyncStorage.getItem('empresa');
      console.log('Nome salvo no AsyncStorage:', nomeSalvo);
      console.log('Empresa salva no AsyncStorage:', empresaSalva);

      // Navegar para a tela Home após login bem-sucedido
      navigation.navigate('home', {
        nomeUsuario: nameData.nome,
        empresa: empresaData.empresa,
      });

      return true;
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      return false;
    }
  };

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Aguarda o carregamento das fontes
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.container}>
        <Image source={require('../../assets/carrofundoescuro.png')} />
        <Image source={require('../../assets/rideshare_login.png')} />
        <Text style={styles.textLogin}>Login</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Matrícula</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua matrícula"
            value={matricula}
            onChangeText={setMatricula}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <BotaoPrincipal
          title={loading ? 'Carregando...' : 'Login'}
          onPress={handleLogin}
          disabled={loading}
        />
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity>
          <Text style={styles.textEsqueceuSenha}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <View style={styles.cadastroContainer}>
          <Text style={styles.textEsqueceuSenha}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('preCadastro')}>
            <Text style={styles.textCadastro}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>ou</Text>
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/facebook.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/google.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/apple.png')} />
        </TouchableOpacity>
      </View>

      <StatusBar style='auto' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cadastroContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  dividerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 40,
  },
  textLogin: {
    fontSize: 23,
    lineHeight: 28,
    fontFamily: 'Poppins_500Medium',
    color: '#7c36cf',
    textAlign: 'left',
  },
  input: {
    borderRadius: 5,
    backgroundColor: '#fcfcfd',
    borderStyle: 'solid',
    borderColor: '#cdced7',
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  textLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Poppins_400Regular',
    color: '#1e1f24',
    textAlign: 'left',
    marginBottom: 10,
  },
  textEsqueceuSenha: {
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#1e1f24',
    textAlign: 'left',
  },
  textCadastro: {
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'Poppins_700Bold',
    color: '#7C36CF',
    textAlign: 'left',
  },
  dividerText: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#7c36cf',
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#DAC4FF',
    borderRadius: 10,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;






