import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

interface MarkerData {
  id: number;
  imagem: string;
  nome: string;
  distancia: string;
  Tempo: string;
  Placa: string;
  cor: string;
  latitude: number;
  longitude: number;
}

const markerData: MarkerData[] = [
  {
    id: 1,
    imagem: '../../assets/modelo1.png',
    nome: "Felipe Oliveira",
    distancia: "",
    Tempo: "",
    Placa: "KGM-2399 - Fiat Uno",
    cor: '../../assets/carro-cinza.png',
    latitude: -8.05613,
    longitude: -34.89451
  },
  {
    id: 2,
    imagem: '../../assets/modelo7.png',
    nome: "Laura Porto",
    distancia: "",
    Tempo: "",
    Placa: "KXM-2367 - Nissan March",
    cor: '../../assets/carro-branco.png',
    latitude: -8.02781,
    longitude: -34.91897
  },
  {
    id: 3,
    imagem: '../../assets/modelo6.png',
    nome: "João Guilherme",
    distancia: "",
    Tempo: "",
    Placa: "KBR-4431 - Hyuindai HB20",
    cor: '../../assets/carro-cinza.png',
    latitude: -8.07202,
    longitude: -34.9099
  },
  {
    id: 4,
    imagem: '../../assets/modelo5.png',
    nome: "Fernanda Feijó",
    distancia: "",
    Tempo: "",
    Placa: "KBB-2110 - Renault Sandero",
    cor: '../../assets/carro-vermelho.png',
    latitude: -8.07701,
    longitude: -34.93097
  },
  {
    id: 5,
    imagem: '../../assets/modelo4.png',
    nome: "Bruna Maia",
    distancia: "",
    Tempo: "",
    Placa: "KDW-1377 - Renault Kwid",
    cor: '../../assets/carro-preto.png',
    latitude: -8.04709,
    longitude: -34.95526
  }
];

export function Mapa() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState<MarkerData[]>(markerData);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      const updatedMarkers = markerData.map(marker => {
        const distance = calcularDistancia(
          loc.coords.latitude,
          loc.coords.longitude,
          marker.latitude,
          marker.longitude
        );
        return {
          ...marker,
          distancia: `${distance.toFixed(2)} km`
        };
      });
      
      setMarkers(updatedMarkers);
      setLoading(false);
    })();
  }, []);

  const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Raio da Terra em quilômetros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (degrees: number): number => {
    return degrees * Math.PI / 180;
  };

  if (loading || !location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.nome}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Image source={{uri: marker.imagem}} style={styles.calloutImage} />
                <Text style={styles.calloutTitle}>{marker.nome}</Text>
                <Text>Distância: {marker.distancia}</Text>
                <Text>Placa: {marker.Placa}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutContainer: {
    width: 200,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  calloutImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Mapa;
