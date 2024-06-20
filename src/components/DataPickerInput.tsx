import React from 'react';
import { View, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface DateTimePickerProps {
  mode: 'date' | 'time'; // Modo pode ser 'date' para seleção de data ou 'time' para seleção de hora
  isVisible: boolean; // Indica se o picker deve ser mostrado ou não
  date: Date; // Data inicial selecionada
  onConfirm: (date: Date) => void; // Função para lidar com a confirmação da seleção
  onCancel: () => void; // Função para lidar com o cancelamento da seleção
}

const DateTimePickerComponent: React.FC<DateTimePickerProps> = ({
  mode,
  isVisible,
  date,
  onConfirm,
  onCancel,
}) => {
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode={mode}
      date={date}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default DateTimePickerComponent;
