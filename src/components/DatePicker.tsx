import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BotaoPrincipal } from './Botao';

export function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', gap:10}}>
            <View>
                <TouchableOpacity style={{backgroundColor:'#fdfcff', padding:15, borderWidth:1, borderColor:'#cdced7', paddingHorizontal:66}} onPress={showDatepicker} >
                    <Text>Data</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{backgroundColor:'#fdfcff', padding:15, borderWidth:1, borderColor:'#cdced7', paddingHorizontal:66}} onPress={showTimepicker} >
                    <Text>Hora</Text>
                </TouchableOpacity>
            </View>
        </View>
            <Text style={{fontSize:18, color:'#6000AC'}}>Selected: {date.toLocaleString()}</Text>
            {show && (
                <DateTimePicker
                value={date}
                mode={mode as 'date' | 'time'}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
