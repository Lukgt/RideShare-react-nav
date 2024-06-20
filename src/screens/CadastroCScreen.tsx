import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BotaoPrincipal } from '../components/Botao';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Importe Picker corretamente
import{useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'


export function CadastroCScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [setor, setSetor] = useState('');


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
          onPress={() => navigation.navigate('login')}
        />
        <Text style={styles.textCadastro}>Crie uma conta</Text>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.sectionHeader}>Dados Pessoais</Text>
          <Text style={styles.step}>Passo 1/2</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
          <TextInput style={styles.input} placeholder="E-mail institucional" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Confirme seu e-mail" keyboardType="email-address" value={confirmEmail} onChangeText={setConfirmEmail} />

          {/* Picker para Empresa */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={empresa}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setEmpresa(itemValue)}
            >
              <Picker.Item label="Selecione a Empresa" value="" />
              <Picker.Item label="Refinaria" value="refinaria" />
              <Picker.Item label="Faculdade Senac" value="faculdade senac" />
            </Picker>
          </View>

          <TextInput style={styles.input} placeholder="Matrícula" value={matricula} onChangeText={setMatricula} />
          

          {/* Picker para Setor */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={setor}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setSetor(itemValue)}
            >
              <Picker.Item label="Selecione o Setor" value="" />
              <Picker.Item label="Administração" value="administração" />
              <Picker.Item label="Desenvolvimento" value="desenvolvimento" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
        <BotaoPrincipal title="Continuar" onPress={() => navigation.navigate('cadastroC2')} />
      </View>

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 233,
  },
  step: {
    marginTop: 16,
    fontWeight: 'bold',
    backgroundColor: '#EDE2FF',
    padding: 10,
    borderRadius: 15,
    position: 'relative',
    bottom: 40,
    left: 80,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    position: 'relative',
    top: 10,
    right: 70,
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
  pickerContainer: {
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
  picker: {
    height: 50,
    width: '100%',
    color: '#62636C',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
});

export default CadastroCScreen;