import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function PerfilScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });
  //switch
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);

  const toggleSwitch1 = () => {
    setIsEnabled1(previousState => !previousState);
    
  };

  const toggleSwitch2 = () => {
    setIsEnabled2(previousState => !previousState);
    
  };

  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Substitua pela URL da sua API
    axios.get('https://sua-api.com/user/profile')
      .then(response => {
        setUserName(response.data.name);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do usuário:', error);
        setLoading(false);
      });
  }, []);

  if (!fontsLoaded || loading) {
    return null; // Aqui você pode adicionar um spinner de carregamento se desejar
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ backgroundColor: '#6000AC', height: 134, alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text style={styles.textPerfil}>Perfil</Text>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
        <Image
          style={{ borderRadius: 100, height: 100, width: 100 }}
          source={require('../../assets/account.png')}
        />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text style={styles.textSubPerfil}>Perfil</Text>
        <TouchableOpacity>
          <View style={{flexDirection:'row', justifyContent:'space-between', gap:250, marginTop:10}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <MaterialCommunityIcons
                  name="account"
                  size={40}
                  color="#6000AC"
                  style={{ alignSelf: 'flex-start',marginRight:10}}
                  />
            <Text>Conta</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                  name="arrow-right"
                  size={40}
                  color="#6000AC"
                  style={{ alignSelf: 'flex-end'}}
                />
            </View>
          </View>
          <View style={{height:1,borderWidth:0.7,borderColor:'#B9BBC6'}}/>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{flexDirection:'row', justifyContent:'space-between', gap:240, marginTop:10}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <MaterialCommunityIcons
                  name="translate"
                  size={35}
                  color="#6000AC"
                  style={{ alignSelf: 'flex-start', marginRight:10, marginLeft:10}}
                  />
            <Text>Idiomas</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                  name="arrow-right"
                  size={40}
                  color="#6000AC"
                  style={{ alignSelf: 'flex-end', marginRight:10}}
                />
            </View>
          </View>
          <View style={{height:1,borderWidth:0.7,borderColor:'#B9BBC6'}}/>
        </TouchableOpacity>

      </View>

      <View style={{alignItems:'center',justifyContent:'center', marginTop:20}}>
        <Text style={styles.textSubPerfil}>Notificações</Text>
        <TouchableOpacity>
          <View style={{flexDirection:'row', justifyContent:'space-between', gap:150, marginTop:10}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <MaterialCommunityIcons
                  name="email"
                  size={35}
                  color="#6000AC"
                  style={{ alignSelf: 'flex-start',marginRight:10}}
                  />
            <Text>Notificações no e-mail</Text>
            </View>
            <View>
              <Switch
                  trackColor={{false: '#767577', true: '#6000AC'}}
                  thumbColor={isEnabled1 ? '#FFFFFF' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch1}
                  value={isEnabled1}
                />
            </View>
          </View>
          <View style={{height:1,borderWidth:0.7,borderColor:'#B9BBC6'}}/>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{flexDirection:'row', justifyContent:'space-between', gap:130, marginTop:10}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <MaterialCommunityIcons
                  name="bell-ring"
                  size={35}
                  color="#6000AC"
                  style={{ alignSelf: 'flex-start', marginRight:10, marginLeft:10}}
                  />
            <Text>Notificações de atividade</Text>
            </View>
            <View>
              <Switch
                  trackColor={{false: '#767577', true: '#6000AC'}}
                  thumbColor={isEnabled2 ? '#FFFFFF' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch2}
                  value={isEnabled2}
                />
            </View>
          </View>
          <View style={{height:1,borderWidth:0.7,borderColor:'#B9BBC6'}}/>
        </TouchableOpacity>

      </View>

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  textPerfil: {
    fontSize: 27,
    lineHeight: 32,
    fontWeight: "700",
    color: "#fdfcff",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 233,
    marginBottom: 20
  },
  textSubPerfil: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "700",
    fontFamily: "Poppins-500Medium",
    color: "#000",
    textAlign: "left",
    alignSelf:'flex-start',
    marginLeft:20,
    marginTop:10
    },
  userName: {
    fontSize: 22,
    color: "#333",
    fontFamily: "Poppins_500Medium",
    marginTop: 20
  }
});