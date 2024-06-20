import React, { useState } from 'react';
import { ScrollView,View, Text, Button, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { BotaoEntrar, BotaoPrincipal } from '../components/Botao';
import{useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'


export function LoginScreen() {

const [matricula, setMatricula] = useState('');
const [senha, setSenha] = useState('');
const [loading, setLoading] = useState(false); // Estado para controlar o estado de carregamento do botão
const [error, setError] = useState(null); // Estado para armazenar mensagens de erro





const handleLogin = async () => {
    // Verificar se os campos estão vazios
    if (!matricula.trim() || !senha.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
  
    // Simular um estado de carregamento enquanto a autenticação ocorre
    setLoading(true);
  
    try {
      // Aqui você faria a chamada real para a API de autenticação
      // Substitua este trecho com a lógica real de autenticação
      // Simulando uma chamada de API por 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Simulando sucesso ou falha com base em um exemplo simples
      const loginSuccess = true; // Substitua isso com a lógica real de sucesso/falha
  
      if (loginSuccess) {
        navigation.navigate('home'); // Navegar para a tela home após o login bem-sucedido
      } else {
        setError('Matrícula ou senha inválidas.'); // Simular erro de autenticação
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      setError('Erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false); // Finaliza o estado de carregamento após a autenticação
    }
  };

const navigation = useNavigation();

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


  return (
    <ScrollView style={{flex:1, backgroundColor: '#FFFFFF'}}>

        <View style={{alignItems:'center', justifyContent:'center', marginBottom:40}}>
            <Image
            source={require('../../assets/carrofundoescuro.png')}
            />
            <Image
            source={require('../../assets/rideshare_login.png')}
            />
            
            <Text style={styles.textLogin}>Login</Text>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <View>
            <Text style={styles.textLabel}>Matrícula</Text>
            <TextInput
            style={styles.input}
            placeholder="Digite sua matrícula"
            value={matricula}
            onChangeText={setMatricula}
            />
        </View>
        <View>
            <Text style={styles.textLabel}>Senha</Text>
            <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
            />
        </View>

        {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
        <BotaoPrincipal
            title={loading ? 'Carregando...' : 'Login'}
            onPress={handleLogin}
            disabled={loading}
        />
        </View>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-around',marginTop:20}}>

            <TouchableOpacity>
                <Text style={styles.textEsqueceuSenha}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row',gap:5}}>
               <Text style={styles.textEsqueceuSenha}>Não tem conta?</Text>

                <TouchableOpacity
                onPress={()=> navigation.navigate('preCadastro')}
                >
                    <Text style={styles.textCadastro}>Cadastre-se</Text>
                </TouchableOpacity> 
            </View>
            
            
            


        </View>
        <View style={{alignItems: "center",justifyContent: "center",padding: 10, marginTop: 20}}>
            <Text style={{fontSize: 14,lineHeight: 14,fontFamily: "Poppins_400Regular",color: "#7c36cf"}}>ou</Text>
        </View>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:20, marginBottom:40}}>

            <TouchableOpacity 
            style={{borderWidth:1, borderColor:'#DAC4FF', borderRadius:10, padding:10}}
            onPress={() => navigation.navigate('home')}
            >
                <Image
                    source={require('../../assets/facebook.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity 
            style={{borderWidth:1, borderColor:'#DAC4FF', borderRadius:10, padding:10}}
            onPress={() => navigation.navigate('home')}
            >
                <Image
                        source={require('../../assets/google.png')}
                    />
            </TouchableOpacity>

            <TouchableOpacity 
            style={{borderWidth:1, borderColor:'#DAC4FF', borderRadius:10, padding:10}}
            onPress={() => navigation.navigate('home')}
            >
                <Image
                        source={require('../../assets/apple.png')}
                    />
            </TouchableOpacity>

        </View>
        
      
        
        <StatusBar style='auto'/>
    </ScrollView>
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
    textLogin: {
        fontSize: 23,
        lineHeight: 28,
        fontFamily: "Poppins_500Medium",
        color: "#7c36cf",
        textAlign: "left"
        },
    
    input:{
        borderRadius: 5,
        backgroundColor: "#fcfcfd",
        borderStyle: "solid",
        borderColor: "#cdced7",
        borderWidth: 1,
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        minWidth: 343,
        maxWidth: 343
    },
    textLabel:{
        fontSize: 16,
        lineHeight: 19,
        fontFamily: "Poppins_400Regular",
        color: "#1e1f24",
        textAlign: "left",
        marginBottom: 10
    },
    textEsqueceuSenha:{
        fontSize: 12,
        lineHeight: 14,
        fontFamily: "Poppins_400Regular",
        color: "#1e1f24",
        textAlign: "left"
    },
    textCadastro:{
        fontSize: 12,
        lineHeight: 14,
        fontFamily: "Poppins_700Bold",
        color: "#7C36CF",
        textAlign: "left"
    }
});