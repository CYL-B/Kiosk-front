import React from "react";

<<<<<<< HEAD
import { Image, StyleSheet, View, Text, ImageBackground } from 'react-native';
=======
import { Image, StyleSheet, View, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
>>>>>>> pageaccueil

// Import des composants Button customisés
import { Button, ButtonText } from "../components/Buttons";

// Import du Carousel
import CarouselCards from "../components/carousel/CarouselCards";

const WelcomeScreen = (props) => {
<<<<<<< HEAD
=======
  var bgColor = [];
>>>>>>> pageaccueil
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
<<<<<<< HEAD

      
        <Button style={{ margin: 10 }} size="md" color="primary" title="S'inscrire" onPress={() => props.navigation.push('Inscription', { clientType: 'client' })} />
        <ButtonText color="light" title="Vous avez déjà un compte ?" onPress={() => props.navigation.navigate('Connexion')} />
        <Button style={{ margin: 30 }}buttonStyle={styles.button} size="md" color="secondary" title="S'inscrire en tant que presta" onPress={() => props.navigation.navigate('Inscription', { clientType: 'partner' })} />
        

        {/* <ButtonText color="default" title="Vers l'app" onPress={() => props.navigation.navigate('TabNavigation')} />

        <ButtonText color="default" title="Vers Demande de devis" onPress={() => props.navigation.navigate('QuoteRequest')} /> */}
=======
        <Button
          size="md"
          color="primary"
          title="S'inscrire"
          onPress={() =>
            props.navigation.navigate("Inscription", { clientType: "client" })
          }
        />
        <ButtonText
          color="light"
          title="Vous avez déjà un compte ?"
          onPress={() => props.navigation.navigate("Connexion")}
        />
        <Button
          buttonStyle={styles.button}
          size="md"
          color="secondary"
          title="S'inscrire en tant que presta"
          onPress={() =>
            props.navigation.navigate("Inscription", { clientType: "partner" })
          }
        />

        <ButtonText
          color="default"
          title="Vers l'app"
          onPress={() => props.navigation.navigate("TabNavigation")}
        />

        <ButtonText
          color="default"
          title="Vers Demande de devis"
          onPress={() => props.navigation.navigate("QuoteRequest")}
        />
>>>>>>> pageaccueil
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
<<<<<<< HEAD
    justifyContent: "space-between"
=======
    justifyContent: "space-between",
>>>>>>> pageaccueil
  },
  image: {
    width: 200,
    height: 34.9,
    marginTop: 114,
    alignSelf: "center",
<<<<<<< HEAD
  }
=======
  },
  button: {},
>>>>>>> pageaccueil
});

export default WelcomeScreen;
