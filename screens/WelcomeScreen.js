import React from 'react';
import { View, Text} from 'react-native';
import Button from '../components/Button';

const WelcomeScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome</Text>
            <Button size="md" color="primary" title="Se connecter" onPress={() => props.navigation.navigate('Connexion')} />
            <Button size="md" color="primary" title="S'inscrire" onPress={() => props.navigation.navigate('Inscription')} />
            <Button size="sm" color="secondary" title="Vers l'app" onPress={() => props.navigation.navigate('TabNavigation')} />
        </View>
    );
};

export default WelcomeScreen;