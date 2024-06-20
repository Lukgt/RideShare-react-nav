import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface CardMotoristaProps {
  foto: string;
  nome: string;
  destino: string;
  setor: string;
  tempoEncontro: string;
}

const CardMotorista: React.FC<CardMotoristaProps> = ({
  foto,
  nome,
  destino,
  setor,
  tempoEncontro,
}) => {
  const [solicitacaoAceita, setSolicitacaoAceita] = useState(false);
  const [solicitacaoNegada, setSolicitacaoNegada] = useState(false);
  const [confirmacaoVisible, setConfirmacaoVisible] = useState(false);

  const handleAceitar = () => {
    setSolicitacaoAceita(true);
    setSolicitacaoNegada(false);
    setConfirmacaoVisible(false);
  };

  const handleNegar = () => {
    setSolicitacaoNegada(true);
    setSolicitacaoAceita(false);
    setConfirmacaoVisible(false);
  };

  const mostrarConfirmacao = () => {
    setConfirmacaoVisible(true);
  };

  return (
    <View style={styles.card}>

      <Image source={{ uri: foto }} style={styles.foto} />

      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.texto}>Destino: {destino}</Text>
        <Text style={styles.texto}>Setor: {setor}</Text>
        <Text style={styles.texto}>Tempo de Encontro: {tempoEncontro}</Text>

        {solicitacaoAceita && (
          <Text style={[styles.texto, { color: 'green', fontWeight: 'bold' }]}>
            Solicitação Aceita!
          </Text>
        )}

        {solicitacaoNegada && (
          <Text style={[styles.texto, { color: 'red', fontWeight: 'bold' }]}>
            Solicitação Negada!
          </Text>
        )}

        {!solicitacaoAceita && !solicitacaoNegada && (
          <View>
            {confirmacaoVisible ? (
              <View style={styles.confirmacaoContainer}>
                <Text style={styles.confirmacaoTexto}>Gostaria de aceitar essa solicitação?</Text>

                <View style={styles.botoesContainer}>
                  <TouchableOpacity onPress={handleAceitar} style={[styles.botao, styles.botaoAceitar]}>
                    <Text style={styles.textoBotao}>Aceitar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleNegar} style={[styles.botao, styles.botaoNegar]}>
                    <Text style={styles.textoBotao}>Negar</Text>
                  </TouchableOpacity>

                </View>
              </View>
            ) : (
              <TouchableOpacity onPress={mostrarConfirmacao} style={styles.botaoMostrarConfirmacao}>
                <Text style={styles.textoBotao}>Gostaria de aceitar essa solicitação?</Text>
              </TouchableOpacity>
            )}

          </View>
        )}
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F5EEFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
    width: 360,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 14,
    color: '#666',
  },
  botaoMostrarConfirmacao: {
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  confirmacaoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  confirmacaoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems:'flex-start',
  },
  botoesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  botao: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  botaoAceitar: {
    backgroundColor: '#5cb85c', // Verde
  },
  botaoNegar: {
    backgroundColor: '#d9534f', // Vermelho
  },
  textoBotao: {
    color: '#6000AC',
    fontWeight: 'bold',
  },
});

export default CardMotorista;
