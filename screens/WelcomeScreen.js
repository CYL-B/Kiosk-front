import React from 'react';

import { Image, StyleSheet, View, Text, ImageBackground} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

// Import des composants Button customisés
import { Button, ButtonText } from '../components/Buttons';

const WelcomeScreen = (props) => {
    var bgColor=[]
    return (
        <ImageBackground source={require('../assets/welcomebackground2.png')} style={styles.container}>
            
          
          <Image source={require('../assets/logo-light-2.png')} style={styles.image}/>
          
    
            <Text>Welcome</Text>
            <Button size="md" color="primary" title="Se connecter" onPress={() => props.navigation.navigate('Connexion')} />
            <Button size="md" color="primary" title="S'inscrire" onPress={() => props.navigation.navigate('Inscription', { clientType: 'client'})} />
            <Button size="md" color="secondary" title="S'inscrire en tant que presta" onPress={() => props.navigation.navigate('Inscription', { clientType: 'partner'})} />
            <ButtonText color="default" title="Vers l'app" onPress={() => props.navigation.navigate('TabNavigation')} />
        
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
      justifyContent: 'center'
    },
    image:{
        width: 200,
            height: 34.9,
            marginTop: 114
    }
  });

export default WelcomeScreen;