import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Switch, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function PerfilScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [userName, setUserName] = useState('Usuário');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para carregar o nome e a imagem do perfil do AsyncStorage
  const loadUserData = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem('nome');
      const storedProfileImage = await AsyncStorage.getItem('@profile_image_uri');
      if (storedUserName) {
        setUserName(storedUserName);
      }
      if (storedProfileImage) {
        setProfileImage(storedProfileImage);
      }
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      setLoading(false);
    }
  };

  // Efeito para carregar os dados do usuário ao montar o componente
  useEffect(() => {
    loadUserData();

    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'É necessário permitir o acesso à galeria de imagens para selecionar uma foto de perfil.');
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        const selectedImageUri = result.assets[0].uri;
        if (selectedImageUri) {
          setProfileImage(selectedImageUri);
          await AsyncStorage.setItem('@profile_image_uri', selectedImageUri);
        }
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem de perfil:', error);
    }
  };

  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

  if (!fontsLoaded || loading) {
    return null; // Aqui você pode adicionar um spinner de carregamento se desejar
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ backgroundColor: '#6000AC', height: 134, alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text style={styles.textPerfil}>Perfil</Text>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image
              style={{ borderRadius: 100, height: 100, width: 100 }}
              source={{ uri: profileImage }}
            />
          ) : (
            <Image
              style={{ borderRadius: 100, height: 100, width: 100 }}
              source={require('../../assets/account.png')}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.textSubPerfil}>Perfil</Text>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 250, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="account"
                size={40}
                color="#6000AC"
                style={{ alignSelf: 'flex-start', marginRight: 10 }}
              />
              <Text>Conta</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name="arrow-right"
                size={40}
                color="#6000AC"
                style={{ alignSelf: 'flex-end' }}
              />
            </View>
          </View>
          <View style={{ height: 1, borderWidth: 0.7, borderColor: '#B9BBC6' }} />
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 240, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="translate"
                size={35}
                color="#6000AC"
                style={{ alignSelf: 'flex-start', marginRight: 10, marginLeft: 10 }}
              />
              <Text>Idiomas</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name="arrow-right"
                size={40}
                color="#6000AC"
                style={{ alignSelf: 'flex-end', marginRight: 10 }}
              />
            </View>
          </View>
          <View style={{ height: 1, borderWidth: 0.7, borderColor: '#B9BBC6' }} />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <Text style={styles.textSubPerfil}>Notificações</Text>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 150, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="email"
                size={35}
                color="#6000AC"
                style={{ alignSelf: 'flex-start', marginRight: 10 }}
              />
              <Text>Notificações no e-mail</Text>
            </View>
            <View>
              <Switch
                trackColor={{ false: '#767577', true: '#6000AC' }}
                thumbColor={isEnabled1 ? '#FFFFFF' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch1}
                value={isEnabled1}
              />
            </View>
          </View>
          <View style={{ height: 1, borderWidth: 0.7, borderColor: '#B9BBC6' }} />
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 130, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="bell-ring"
                size={35}
                color="#6000AC"
                style={{ alignSelf: 'flex-start', marginRight: 10, marginLeft: 10 }}
              />
              <Text>Notificações de atividade</Text>
            </View>
            <View>
              <Switch
                trackColor={{ false: '#767577', true: '#6000AC' }}
                thumbColor={isEnabled2 ? '#FFFFFF' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2}
                value={isEnabled2}
              />
            </View>
          </View>
          <View style={{ height: 1, borderWidth: 0.7, borderColor: '#B9BBC6' }} />
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
    lineHeight: 28,
    fontWeight: "700",
    fontFamily: "Poppins_700Bold",
    color: "#3C3A36",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 10,
  }
});
