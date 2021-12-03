import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login</Text>
            <Button title="S'inscrire" onPress={() => props.navigation.navigate('Inscription')} />
            <Button title="Vers l'app" onPress={() => props.navigation.navigate('TabNavigation')} />
            <Button title="Annuler" onPress={() => props.navigation.navigate('Bienvenue')} />
        </View>
    );
};

export default LoginScreen;