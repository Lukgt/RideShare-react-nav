import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import{useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins'

interface BotaoProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  isSelected: boolean; // Estado para indicar se o botão está selecionado
}

const BotaoCarona: React.FC<BotaoProps> = ({ title, onPress, isSelected }) => (
  <TouchableOpacity
    style={[styles.botaoCarona, isSelected && styles.activeButton]}
    onPress={onPress}
  >
    <Text style={[styles.textBotaoCarona, isSelected && styles.activeText]}>{title}</Text>
  </TouchableOpacity>
);

const BotaoMotorista: React.FC<BotaoProps> = ({ title, onPress, isSelected }) => (
  <TouchableOpacity
    style={[styles.botaoMotorista, isSelected && styles.activeButton]}
    onPress={onPress}
  >
    <Text style={[styles.textBotaoMotorista, isSelected && styles.activeText]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  botaoCarona: {
    borderRadius: 5,
    backgroundColor: "#fdfcff",
    borderWidth: 1,
    borderColor: '#7c36cf',
    width: 160,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  textBotaoCarona: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#7c36cf",
    textAlign: "center"
  },
  botaoMotorista: {
    borderRadius: 5,
    backgroundColor: "#fdfcff", // Cor de fundo padrão para botão não selecionado (branco)
    borderWidth: 1,
    borderColor: '#7c36cf',
    width: 160,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  textBotaoMotorista: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#7c36cf", // Cor do texto padrão para botão não selecionado (roxo)
    textAlign: "center",
  },
  activeButton: {
    backgroundColor: "#7c36cf", // Cor de fundo quando selecionado (roxo)
  },
  activeText: {
    color: "#fdfcff", // Cor do texto quando selecionado (branco)
  }
});

export { BotaoCarona, BotaoMotorista };