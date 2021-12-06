import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonText } from '../components/Buttons';

const CompanyScreen = (props) => {

    var dataTest = "Blablabla"
    
    return (
        <View screenOptions={{headerShown: false}} style={{ flex: 1, justifyContent: 'center', marginTop:"5%" }}>

            {/* IMAGE ENTREPRISE */}
            <View>
                <ImageBackground
                    source={require('../assets/image_bureau.png')}
                    
                    style={{ width: 400, height: 200 }} /* ATTENTION SIZING IMAGE A REVOIR */
                >
                    <View style={{position:"absolute", bottom:"5%", right:"5%"}}>
                        <ButtonText
                            color="light"
                            title="Ajouter"
                        />
                    </View>
                </ImageBackground>
            </View>

            <ScrollView>

                {/* CARD INFOS COMPANY */}
                <View style={{flex:1}}>
                    <Card key={1} >
                        <Card.Title style={{textAlign:"left"}}
                        >Qui sommes-nous ?</Card.Title>
                            <View style={{backgroundColor: "#FAF0E6", height: 160, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{textAlign:"center"}}>
                                    Ajout data
                                </Text>
                                <Text></Text>
                                <ButtonText
                                    color="secondary"
                                    title="Ajouter"
                                />
                            </View>
                    </Card>
                </View>

                {/* CARD LABELS COMPANY */}
                <View style={{flex:1}}>
                    <Card key={1} >
                        <Card.Title style={{textAlign:"left"}}
                        >Nos labels</Card.Title>
                        <Card.Divider/>
                            <View style={{backgroundColor: "#FAF0E6", height: 160, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{textAlign:"center"}}>
                                    Ajout data
                                </Text>
                                <Text></Text>
                                <ButtonText
                                    color="secondary"
                                    title="Ajouter"
                                />
                            </View>
                    </Card>
                </View>

                {/* CARD OFFRES COMPANY */}
                <View style={{flex:1}}>
                    <Card key={1} >
                        <Card.Title style={{textAlign:"left"}}
                        >Nos offres</Card.Title>
                        <Card.Divider/>
                            <View style={{backgroundColor: "#FAF0E6", height: 160, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{textAlign:"center"}}>
                                    Ajout data
                                </Text>
                                <Text></Text>
                                <ButtonText
                                    color="secondary"
                                    title="Ajouter"
                                />
                            </View>
                    </Card>
                </View>

            </ScrollView>

        </View>
    );
};

export default CompanyScreen;