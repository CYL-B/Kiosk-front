import React, {useState, useEffect} from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Card, Image, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

import { ButtonText } from '../components/Buttons';
import {HeaderBar} from '../components/Header'

import { REACT_APP_IPSERVER } from '@env'; // mettre à la place de notre url d'ip avec http:// devant = varibale d'environnement


const CompanyScreen = (props) => {

    var data = "";

    var displayCieImg; // aller chercher une image dans le téléhone du presta
    var displayDescCie; // input
    var displayLabels; // ???
    var displayOffers; // aller cherche une offre en DB ?

    const [ descCie, setDescCie ] = useState("");
    const [ descOk, setDescOk ] = useState(false);
    const [ companyId, setCompanyId ] = useState("");

    const { cieId } = route.params;
    setCompanyId(cieId);

    useEffect(() => {
        async function loadData() {
            var rawDataCie = await fetch(`http://${REACT_APP_IPSERVER}/companies/${companyId}?token=${props.user.token}`); // (`adresseIPserveur/route appelée/req.params?req.query`)
            var dataCie = await rawDataCie.json();
            setDescCie(dataCie.description);
            if (dataCie.description) {
                setDescOk(true);
            }
        }
        loadData();
    }, []);

    var handleSubmitDescCie = async () => {
        const dataRaw = await fetch(`http://${REACT_APP_IPSERVER}/companies/${companyId}`, { // renvoie jsute result, donc true ou flase
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `descprition=${descCie}&token=${props.user.token}`
        })
        var res = await dataRaw.json(); // true ou false
        if (res.result) {
            setDescOk(true);
        }
    }

    if (data) {
        displayCieImg = 
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
    } else if (!data) {
        displayCieImg = 
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
    };

    if (descOk && descCie) {
        displayDescCie = 
        <Card key={1} >
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Card.Title
                >Qui sommes-nous ?</Card.Title>
                <ButtonText
                    color="secondary"
                    title="Modifier"
                />
            </View>
            
            <Text>{descCie}</Text>
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

    } else {
        displayDescCie = 
        <Card key={1} >
            <Card.Title style={{textAlign:"left"}}
            >Qui sommes-nous ?</Card.Title>
                <View style={{backgroundColor: "#FAF0E6", height: 160, justifyContent:"center", alignItems:"center"}}>
                    {/* <Text style={{textAlign:"center"}}>
                        Veuillez ajouter une description
                    </Text> */}
                    <Text></Text>
                    <Input
                        style={{ fontSize: 15 }}
                        inputContainerStyle={{width:'80%', marginLeft:'18%', right:20}} // !!! CENTRE A L'ARRACHE
                        value={descCie}
                        placeholder="Veuillez ajouter une description"
                        onChangeText={(e) => setDescCie(e)}
                    />
                    <ButtonText
                        color="secondary"
                        title="Ajouter"
                        onClick={() => handleSubmitDescCie()}
                    />
                </View>
        </Card>
    };
console.log("descInput", descCie);

    if (data) {
        displayLabels = 
        <Card key={1} >
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Card.Title
                >Nos labels</Card.Title>
                <ButtonText
                    color="secondary"
                    title="Ajouter"
                />
            </View>
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
        </Card>
    } else if (!data) {
        displayLabels =
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
    };

    if (data) {
        displayOffers =
        <Card key={1} >
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Card.Title
                >Nos offres</Card.Title>
                <ButtonText
                    color="secondary"
                    title="Ajouter"
                />
            </View>
                <View style={{height: 160, justifyContent:"center", alignItems:"center"}}>
                    <Text>OFFER CARD</Text>
                </View>
        </Card>
    } else if (!data) {
        displayOffers =
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
    };

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
                {displayCieImg}
            </View>

            {/* CARD INFOS COMPANY */}
            <View style={{flex:1}}>
                {displayDescCie}
            </View>

            {/* CARD LABELS COMPANY */}
            <View style={{flex:1}}>
                {displayLabels}
            </View>

            {/* CARD OFFRES COMPANY */}
            <View style={{flex:1, paddingBottom:15}}>
                {displayOffers}
            </View>

            </ScrollView>

        </View>
    );

};

export default CompanyScreen;