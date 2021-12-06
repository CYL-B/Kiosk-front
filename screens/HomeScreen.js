import React from 'react';
import { View, Text } from 'react-native';
// Import des composants Button customisés
import { Button, ButtonText } from '../components/Buttons';

const HomeScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home</Text>
            <Button size="md" color="primary" title="Company Page" onPress={() => props.navigation.navigate('CompanyPage')} />
        </View>
    );
};

export default HomeScreen;