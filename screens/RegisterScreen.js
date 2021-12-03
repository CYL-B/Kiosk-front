import React from 'react';
import { View, Text, Button } from 'react-native';

const RegisterScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Register</Text>
            <Button title="Se connecter" onPress={() => props.navigation.navigate('Connexion')} />
            <Button title="Vers l'app" onPress={() => props.navigation.navigate('TabNavigation')} />
            <Button title="Annuler" onPress={() => props.navigation.navigate('Bienvenue')} />
        </View>
    );
};

export default RegisterScreen;