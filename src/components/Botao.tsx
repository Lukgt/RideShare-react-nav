import React from "react";
import { StyleSheet, View, Text, Pressable, GestureResponderEvent } from "react-native";


interface BotaoProps {
    title: string;
    onPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
}

export function BotaoPrincipal({ title, onPress, disabled}: BotaoProps) {



    return(
    <>
        <Pressable 
            style={styles.botao} 
            onPress={onPress} 
            disabled={disabled}>
            <Text style={styles.textBotao}>{title}</Text>
        </Pressable>
    </>
    )
}

export function BotaoEntrar({ title, onPress }: BotaoProps){

    return(
    <>
        <Pressable style={styles.botaoEntrar} onPress={onPress}>
            <Text style={styles.textBotaoEntrar}>{title}</Text>
        </Pressable>
    </>
    )
}


const styles = StyleSheet.create({
    textBotao: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "#fdfcff",
    textAlign: "center"
    },

    botao: {
    borderRadius: 5,
    backgroundColor: "#6000ac",
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    minWidth: 343,
    maxWidth: 343
    },

    textBotaoEntrar: {
        fontSize: 16,
        lineHeight: 19,
        fontWeight: "500",
        color: "#7c36cf",
        textAlign: "center"
        },
    
    botaoEntrar:{
        borderRadius: 5,
        backgroundColor: "#fdfcff",
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        minWidth: 343,
        maxWidth: 343
    }
});