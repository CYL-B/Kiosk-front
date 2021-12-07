import React, {useState, useEffect} from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Card, Image, Input, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

import { ButtonText } from '../components/Buttons';
import {HeaderBar} from '../components/Header'

import { REACT_APP_IPSERVER } from '@env'; // mettre à la place de notre url d'ip avec http:// devant = varibale d'environnement

import {connect} from 'react-redux';


const CompanyScreen = (props) => {

    var data = "";

    var displayCieImg; // aller chercher une image dans le téléhone du presta
    var displayDescCie; // input
    var displayLabels; // affichage en list des labels à ajouter
    var displayOffers; // aller cherche une offre en DB ?

    const [ descCie, setDescCie ] = useState("");
    const [ descOk, setDescOk ] = useState(false);
    const [ companyId, setCompanyId ] = useState("");
    const [ nameCie, setNameCie ] = useState("");
    const [ addressCie, setAddressCie ] = useState([]); // ???
    const [ labels, setLabels ] = useState([]);


    useEffect(() => {
        // const { cieId } = props.route.params; // récupération de l'id cie via la navigation
        var cieId = "61af38ff4b2208eb275e9429";
        setCompanyId(cieId);
        async function loadDataCie() {
            // appel route put pour modifier données company
            var rawDataCie = await fetch(`http://${REACT_APP_IPSERVER}/companies/${cieId}/${props.user.token}`); // (`adresseIPserveur/route appelée/req.params?req.query`)
            var dataCie = await rawDataCie.json();
            setDescCie(dataCie.company.description);
// console.log("dataCie", dataCie.companyName);
            setNameCie(dataCie.company.companyName);
            setAddressCie(...addressCie, dataCie.company.offices[0].city, dataCie.company.offices[0].zipCode) // ???
            if (dataCie.description) {
                setDescOk(true);
            }
        }
        loadDataCie();

        async function loadDataLabels() {
            // appel route get pour récupérer données labels DB
            var rawDataLabels = await fetch(`http://${REACT_APP_IPSERVER}/companies/labels`);
            var dataLabels = await rawDataLabels.json();
            setLabels(dataLabels.dataLabels);
// console.log("dataLabels from Fetch", dataLabels.dataLabels);
        }
        loadDataLabels();
    }, []);
// console.log("état labels", labels[0].logo);

    var handleSubmitDescCie = async () => {
        const dataRaw = await fetch(`http://${REACT_APP_IPSERVER}/companies/${companyId}`, { // renvoie jsute result, donc true ou flase
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `description=${descCie}&token=${props.user.token}`
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
                        onPress={() => handleSubmitDescCie()}
                    />
                </View>
        </Card>
    };

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
                        // source={require('../assets/label_1.png')}
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
            <View style={{backgroundColor: "#FAF0E6", height: 260, justifyContent:"center", alignItems:"center"}}>
                <Text style={{textAlign:"center", marginTop:10, marginBottom:10 }}>
                Avez-vous des labels ?
                </Text>
                <ScrollView>
                <View style={{flex: 1, width:300, height:400}}>
                {
                    labels.map((label, i) => {
                        console.log("label.logo", label.logo);
                        return ( 
                    <ListItem 
                        key={i} 
                        bottomDivider
                        >
                        <Image 
                            source={{ uri: `http://${REACT_APP_IPSERVER}/images/assets/${label.logo}`}}
                            style={{ width: 50, height: 50 }} />
                        <ListItem.Content style={{flexDirection:"row"}}>
                            <View >
                                <ListItem.Title
                                    style={{right:10, flexShrink: 1, left:10}}>{label.labelName}
                                </ListItem.Title>
                            </View>
                        </ListItem.Content>
                        <ButtonText
                            color="secondary"
                            title="Ajouter"
                        />
                    </ListItem>
                    )})
                }

                {/* <ListItem 
                        key={2} 
                        bottomDivider
                        
                        >
                        <Image 
                            source={require('../assets/label_1%.png')}
                            style={{ width: 50, height: 50 }} />
                            <ListItem.Content style={{flexDirection:"row"}}>
                                <ListItem.Title
                                    style={{right:10}}>nameLabel</ListItem.Title> 
                                <View style={{left:30}}>
                                <ButtonText
                                    color="secondary"
                                    title="Ajouter"
                                />
                                </View>
                            </ListItem.Content>
                    </ListItem> */}

                </View>
                </ScrollView>
                <Text></Text>
                
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
                <Text>{"\n"}</Text>
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
            title = {nameCie}
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

// on récupère le user stocké dans le store : 
function mapStateToProps(state) {
      return { user: state.user }
    };

    export default connect(mapStateToProps, null)(CompanyScreen);
