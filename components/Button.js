import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Import du module qui facilite la création de gradient
import { LinearGradient } from 'expo-linear-gradient';

const Button = (props) => {
    
    // Style utilisé pour le container du bouton
    let containerStyle = {
        borderRadius: 5
    }

    // Condition pour définir la taille du bouton
    let btnStyle;
    let fontStyle;
    if (props.size === "md") {
        btnStyle = {  
            paddingHorizontal: 15,
            paddingVertical: 10 
        };
        fontStyle = { 
            color: "#FFFFFF",
            fontSize: 16
        };
    } else {
        btnStyle = { 
            paddingHorizontal: 15,
            paddingVertical: 5
        };
        fontStyle = { 
            color: "#FFFFFF",
            fontSize: 14
        };
    }

    // Condition pour définir la couleur du bouton
    let bgColor;
    if (props.color === "primary") {
        bgColor = ['#F47805', '#F24444'];
    } else {
        bgColor = ['#A1C181', '#619B8A'];
    }

    // Récupération de la fonction onPress envoyée par le parent
    const { onPress } = props;

    return (
        <LinearGradient style={containerStyle} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={bgColor}>
            <TouchableOpacity style={btnStyle} onPress={() => onPress()}>
                <Text style={fontStyle}>{props.title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default Button;