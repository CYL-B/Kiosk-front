import React from 'react';
import { View, Text, Button } from 'react-native';

const WelcomeScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome</Text>
            <Button title="Se connecter" onPress={() => props.navigation.navigate('Connexion')} />
            <Button title="S'inscrire" onPress={() => props.navigation.navigate('Inscription')} />
            <Button title="Vers l'app" onPress={() => props.navigation.navigate('TabNavigation')} />
        </View>
    );
};

export default WelcomeScreen;