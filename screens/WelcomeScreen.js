import React from 'react';
import { View, Text} from 'react-native';

// Import des composants Button customisés
import { Button, ButtonText } from '../components/Buttons';

const WelcomeScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome</Text>
            <Button size="md" color="primary" title="Se connecter" onPress={() => props.navigation.navigate('Connexion')} />
            <Button size="md" color="primary" title="S'inscrire" onPress={() => props.navigation.navigate('Inscription', { clientType: 'client'})} />
            <Button size="md" color="secondary" title="S'inscrire en tant que presta" onPress={() => props.navigation.navigate('Inscription', { clientType: 'partner'})} />
            <ButtonText color="default" title="Vers l'app" onPress={() => props.navigation.navigate('TabNavigation')} />
        </View>
    );
};

export default WelcomeScreen;