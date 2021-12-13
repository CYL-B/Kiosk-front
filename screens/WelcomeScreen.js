import React from "react";

import { Image, StyleSheet, View, ImageBackground } from 'react-native';

// Import des composants Button customisés
import { Button, ButtonText } from "../components/Buttons";

// Import du Carousel
import CarouselCards from "../components/carousel/CarouselCards";

const WelcomeScreen = (props) => {
  return (
    <ImageBackground
      source={require("../assets/welcomebackground2.png")}
      style={styles.container}
    >
      <Image
        source={require("../assets/logo-light-2.png")}
        style={styles.image}
      />

      <CarouselCards />

      <View style={{ alignItems: "center" }}>

      
        <Button style={{ margin: 10 }} size="md" color="primary" title="S'inscrire" onPress={() => props.navigation.push('Inscription', { clientType: 'client' })} />
        <ButtonText color="light" title="Vous avez déjà un compte ?" onPress={() => props.navigation.navigate('Connexion')} />
        <Button style={{ margin: 30 }}buttonStyle={styles.button} size="md" color="secondary" title="S'inscrire en tant que presta" onPress={() => props.navigation.navigate('Inscription', { clientType: 'partner' })} />
        

        {/* <ButtonText color="default" title="Vers l'app" onPress={() => props.navigation.navigate('TabNavigation')} />

        <ButtonText color="default" title="Vers Demande de devis" onPress={() => props.navigation.navigate('QuoteRequest')} /> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between"
  },
  image: {
    width: 200,
    height: 34.9,
    marginTop: 114,
    alignSelf: "center",
  }
});

export default WelcomeScreen;
