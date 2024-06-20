import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { BotaoPrincipal } from '../components/Botao';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function CadastroM2Screen() {
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUF] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [placa, setPlaca] = useState('');
  const [cor, setCor] = useState('');
  const [modelo, setModelo] = useState('');
  const [imagemCNH, setImagemCNH] = useState<string | null>(null); // Estado para armazenar a URI da imagem da CNH
  const [imagemIPVA, setImagemIPVA] = useState<string | null>(null); // Estado para armazenar a URI da imagem do IPVA

   const [fontsLoad] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });


  const navigation = useNavigation();

  if (!fontsLoad) {
    return null;
  }

  // Função para lidar com a seleção de imagem
  const handleEscolherDocumento = async (tipoDocumento: 'cnh' | 'ipva') => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Apenas imagens são permitidas
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      if (tipoDocumento === 'cnh') {
        setImagemCNH(pickerResult.uri); // Armazena a URI da imagem selecionada para a CNH
      } else if (tipoDocumento === 'ipva') {
        setImagemIPVA(pickerResult.uri); // Armazena a URI da imagem selecionada para o IPVA
      }
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    console.log("Iniciando o envio dos dados");
    const cadastroParte1 = await AsyncStorage.getItem('cadastroParte1');
    if (!cadastroParte1) {
      Alert.alert('Erro', 'Dados da primeira etapa não encontrados. Por favor, complete a primeira etapa novamente.');
      navigation.navigate('cadastroM');
      return;
    }

    const cadastroCompleto = {
      ...JSON.parse(cadastroParte1),
      logradouro,
      numero,
      bairro,
      cidade,
      uf,
      senha,
      confirmSenha,
      placa,
      cor,
      modelo,
    };
    console.log("Dados do cadastroCompleto:", cadastroCompleto);

    try {
      const response = await fetch('https://backend-rideshare.onrender.com/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cadastroCompleto),
      });

      const textResponse = await response.text();

      try {
        const responseData = JSON.parse(textResponse);
        if (response.ok) {
          await AsyncStorage.removeItem('cadastroParte1');
          console.log("Cadastro completo com sucesso");
          Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
          navigation.navigate('login');
        } else {
          console.error("Erro ao cadastrar:", responseData);
          Alert.alert('Erro', `Não foi possível completar o cadastro: ${responseData.msg || 'Erro desconhecido'}`);
        }
      } catch (error) {
        console.error("Erro ao parsear a resposta JSON:", error, textResponse);
        Alert.alert('Erro', 'Não foi possível completar o cadastro. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      Alert.alert('Erro', 'Não foi possível completar o cadastro. Tente novamente.');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 40, backgroundColor: '#6000AC', height: 134 }}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={40}
          color="white"
          style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 30 }}
          onPress={() => navigation.navigate('cadastroM')}
        />
        <Text style={styles.textCadastro}>Crie uma conta</Text>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.sectionHeader}>Endereço</Text>
          <Text style={styles.step}>Passo 2/2</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <TextInput style={styles.input} placeholder="Logradouro" value={logradouro} onChangeText={setLogradouro} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TextInput style={styles.input3} placeholder="Número" value={numero} onChangeText={setNumero} />
            <TextInput style={styles.input2} placeholder="Bairro" value={bairro} onChangeText={setBairro} />
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TextInput style={styles.input2} placeholder="Cidade" value={cidade} onChangeText={setCidade} />
            <TextInput style={styles.input3} placeholder="UF" value={uf} onChangeText={setUF} />
          </View>
          <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            secureTextEntry
            value={confirmSenha}
            onChangeText={setConfirmSenha}
          />
          <View style={{alignItems: 'center', marginLeft:30}}>
            <Text style={styles.sectionHeader}>Informações do Veículo</Text>
          </View>
          
             <View style={{ flexDirection: 'row', gap: 10 }}>
                <TextInput style={styles.input3} placeholder="Placa" value={placa} onChangeText={setPlaca}  />
                <TextInput style={styles.input2} placeholder="Cor" value={cor} onChangeText={setCor} />
            </View>

            <TextInput style={styles.input} placeholder="Modelo do veículo" value={modelo} onChangeText={setModelo}/>
          
        </View>

        {/* Componente para escolher os documentos */}
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <Text style={styles.identificacao}>Identificação</Text>
          <Text style={styles.identificacaoSub}>
          Nesta etapa faça upload da seu documento de identificação com foto e IPVA atualizados. O tamanho total de cada arquivo não pode ultrapassar 5 MB.
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', gap:30 }}>
          <TouchableOpacity onPress={() => handleEscolherDocumento('cnh')} style={styles.fileInput}>
            <Text style={styles.fileInputText}>Selecionar CNH...</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEscolherDocumento('ipva')} style={styles.fileInput}>
            <Text style={styles.fileInputText}>Selecionar IPVA...</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {imagemCNH && <Image source={{ uri: imagemCNH }} style={{ width: 100, height: 100, margin: 10 }} />}
          {imagemIPVA && <Image source={{ uri: imagemIPVA }} style={{ width: 100, height: 100, margin: 10 }} />}
        </View>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 30 }}>
        <BotaoPrincipal title="Continuar" onPress={handleSubmit} />
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textCadastro: {
    fontSize: 27,
    lineHeight: 32,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fdfcff',
    textAlign: 'center',
    width: 233,
  },
  step: {
    marginTop: 16,
    fontWeight: 'bold',
    backgroundColor: '#EDE2FF',
    padding: 10,
    borderRadius: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    right: 90,
  },
  identificacao: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 15,
  },
  identificacaoSub: {
    fontSize: 12,
    fontWeight: '500',
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginLeft: 10,
    marginBottom: 15,
    width: 336,
    color: '#62636c',
  },
  input: {
    borderRadius: 5,
    backgroundColor: '#fcfcfd',
    borderStyle: 'solid',
    borderColor: '#cdced7',
    borderWidth: 1,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    minWidth: 343,
    maxWidth: 343,
  },
  input2: {
    borderRadius: 5,
    backgroundColor: '#fcfcfd',
    borderStyle: 'solid',
    borderColor: '#cdced7',
    borderWidth: 1,
    width: 228,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    minWidth: 228,
    maxWidth: 228,
  },
  input3: {
    borderRadius: 5,
    backgroundColor: '#fcfcfd',
    borderStyle: 'solid',
    borderColor: '#cdced7',
    borderWidth: 1,
    width: 100,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    minWidth: 100,
    maxWidth: 100,
  },
  fileInput: {
    backgroundColor: '#d8d9e0',
    padding: 15,
    borderColor: '#8b8d98',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
  },
  fileInputText: {
    fontSize: 14,
    color: '#1e1f24',
  },
});

export default CadastroM2Screen;
