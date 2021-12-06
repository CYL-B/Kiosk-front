import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Card, Image } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

import { ButtonText } from '../components/Buttons';
import {HeaderBar} from '../components/Header'

const CompanyScreen = (props) => {

    var dataTest = "b"

    if (!dataTest) {
        return (

            <View style={{ flex: 1, justifyContent: 'center'}}>
            
            <HeaderBar
                title = "NOM ENTREPRISE"
                onPress={() => onBackPress()}
                leftComponent
                locationIndication
                location="LOCALISATION ENTREPRISE">
            </HeaderBar>

            <ScrollView>

                {/* IMAGE ENTREPRISE */}
                <View>
                    <ImageBackground
                        source={require('../assets/image_company_blank.png')}
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

                    {/* CARD INFOS COMPANY */}
                    <View style={{flex:1}}>
                        <Card key={1} >
                            <Card.Title style={{textAlign:"left"}}
                            >Qui sommes-nous ?</Card.Title>
                                <View style={{backgroundColor: "#FAF0E6", height: 160, justifyContent:"center", alignItems:"center"}}>
                                    <Text style={{textAlign:"center"}}>
                                        Veuillez ajouter une description
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
                                <View style={{backgroundColor: "#FAF0E6", height: 160, justifyContent:"center", alignItems:"center"}}>
                                    <Text style={{textAlign:"center"}}>
                                        Avez-vous des labels ?
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
                    <View style={{flex:1, paddingBottom:15}}>
                        <Card key={1} >
                            <Card.Title style={{textAlign:"left"}}
                            >Nos offres</Card.Title>
                                <View style={{backgroundColor: "#FAF0E6", height: 160, justifyContent:"center", alignItems:"center"}}>
                                    <Text style={{textAlign:"center"}}>
                                        Veuillez ajouter une offre
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
    } else if (dataTest) {
        return (
            <View style={{ flex: 1, justifyContent: 'center'}}>

            <HeaderBar
                title = "NOM ENTREPRISE"
                onPress={() => onBackPress()}
                leftComponent
                locationIndication
                location="LOCALISATION ENTREPRISE">
            </HeaderBar>

            <ScrollView>


                {/* IMAGE ENTREPRISE */}
                <View>
                    <ImageBackground
                        source={require('../assets/image_bureau.png')}
                        style={{ width: 400, height: 200 }} /* ATTENTION SIZING IMAGE A REVOIR */
                    >
                        <View style={{position:"absolute", bottom:"5%", right:"5%"}}>
                            <ButtonText
                                color="light"
                                title="Modifier"
                            />
                        </View>
                    </ImageBackground>
                </View>

                    {/* CARD INFOS COMPANY */}
                    <View style={{flex:1}}>
                        <Card key={1} >
                            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <Card.Title
                                >Qui sommes-nous ?</Card.Title>
                                <ButtonText
                                    color="secondary"
                                    title="Modifier"
                                />
                            </View>
                            <Text>
                                TEXT FROM FRONT
                            </Text>
                            <View style={{height: 160, justifyContent:"center", alignItems:"center"}}>
                                <Text></Text>
                                <View style={{position:"absolute", bottom:"5%"}}>
                                    <ButtonText
                                        color="primary"
                                        title="Voir plus"
                                    />
                                </View>
                            </View>
                        </Card>
                    </View>

                    {/* CARD LABELS COMPANY */}
                    <View style={{flex:1}}>
                        <Card key={1} >
                            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <Card.Title
                                >Nos labels</Card.Title>
                                <ButtonText
                                    color="secondary"
                                    title="Ajouter"
                                />
                            </View>
                            <View style={{height: 50, justifyContent:"center", alignItems:"center"}}>
                                {/* <Text style={{textAlign:"center"}}>
                                    TEXT FROM FRONT
                                </Text> */}
                            </View>
                            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between",  bottom:"5%"}}>
                                <View>
                                    <View style={{marginBottom:30}}>
                                        <Image 
                                            source={require('../assets/label_1%.png')}
                                            style={{ width: 50, height: 50 }}
                                        >
                                        </Image>
                                    </View>
                                    <ButtonText
                                        color="secondary"
                                        title="Supprimer"
                                    />
                                </View>
                                <View>
                                    <View style={{marginBottom:30}}>
                                        <Image
                                            source={require('../assets/label_b.png')}
                                            style={{ width: 50, height: 50, bottom:50 }}
                                        >
                                        </Image>
                                    </View>
                                    <ButtonText
                                        color="secondary"
                                        title="Supprimer"
                                    />
                                </View>
                                <View>
                                    <View style={{marginBottom:30}}>
                                        <Image
                                            source={require('../assets/label_ecocircul.png')}
                                            style={{ width: 50, height: 50, bottom:50 }}
                                        >
                                        </Image>
                                    </View>
                                    <ButtonText
                                        color="secondary"
                                        title="Supprimer"
                                    />
                                </View>
                            </View>
                        </Card>
                    </View>

                   {/* CARD OFFRES COMPANY */}
                    <View style={{flex:1, paddingBottom:15}}>
                        <Card key={1} >
                            <Card.Title style={{textAlign:"left"}}
                            >Nos offres</Card.Title>
                                <View style={{height: 160, justifyContent:"center", alignItems:"center"}}>
                                    <Text>OFFER CARD</Text>
                                </View>
                        </Card>
                    </View>

                </ScrollView>
            </View>
        );
    };

};

export default CompanyScreen;