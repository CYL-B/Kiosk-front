import React, {useState, useEffect} from 'react';
import { View, Text, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native';
import { Card, Image, ListItem, Overlay } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

import { ButtonText, Button } from '../components/Buttons';
import {HeaderBar} from '../components/Header'
import OfferCardLight from '../components/OfferCardLight';

import { REACT_APP_IPSERVER } from '@env'; // mettre à la place de notre url d'ip avec http:// devant = varibale d'environnement

import {connect} from 'react-redux';


const CompanyScreen = (props) => {

    var data = "";
// variables de display :
    var displayCieImg; // aller chercher une image dans le téléhone du presta
    var displayDescCie; // input
    var displayLabels; // affichage en list des labels à ajouter
    var displayOffers; // aller cherche une offre en DB ?


    const [ company, setCompany ] = useState(null);

// états infos Cie :
    const [ companyId, setCompanyId ] = useState("61b097c526db20ecf9e66953");

// états labels :
    const [ labels, setLabels ] = useState([]);

// états overlay :
    const [visible, setVisible] = useState(false);
    const [visibleLabel, setVisibleLabel] = useState(false);
    const [inputOverlay, setInputOverlay] = useState('');
    const [valueToChange, setValueToChange] = useState(null);

    useEffect(() => {
console.log("suivi état company", company);
    }, [company])

// useEffect d'initialisation de la page Company :
    useEffect(() => {
        // const { cieId } = props.route.params; // récupération de l'id cie via la navigation

// DANS USE : fonction chargement des infos de la compagnie loggée :
        async function loadDataCie() {
            // appel route put pour modifier données company
            var rawDataCie = await fetch(`http://${REACT_APP_IPSERVER}/companies/${companyId}/YvbAvDg256hw2t5HfW_stG2yOt9BySaK`); // (`adresseIPserveur/route appelée/req.params?req.query`)
            var dataCie = await rawDataCie.json();
console.log("dataCie", dataCie);
            if (dataCie.result) {
                setCompany(dataCie.company);
            }
        }
        loadDataCie();

// DANS USE : fonction chargement des labels à choisir :
        async function loadDataLabels() {
            // appel route get pour récupérer données labels DB
            var rawDataLabels = await fetch(`http://${REACT_APP_IPSERVER}/companies/labels`);
            var dataLabels = await rawDataLabels.json();
// console.log("rawDataLabels", rawDataLabels);
// console.log("dataLabels.labels", dataLabels);
            setLabels(dataLabels.dataLabels);
// console.log("dataLabels from Fetch", dataLabels.dataLabels);
// console.log("état", labels);
        }
        loadDataLabels();

    }, []);
// console.log("état labels", labels);

// fonction gestion desccription cie :
    var handleSubmitDescCie = async () => {
        const dataRawDesc = await fetch(`http://${REACT_APP_IPSERVER}/companies/${companyId}`, { // renvoie jsute result, donc true ou flase
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `description=${descCie}&token=YvbAvDg256hw2t5HfW_stG2yOt9BySaK`
        })
        var resDesc = await dataRawDesc.json(); // true ou false
        if (resDesc.result) {
            setDescOk(true);
        }
    };

// fonction gestion labels :
    var handleSubmitLabels = async (labelId) => {
        const dataRawLab = await fetch(`http://172.17.1.152:3000/companies/${companyId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `labelId=${labelId}&token=YvbAvDg256hw2t5HfW_stG2yOt9BySaK`
        })
        var resLab = await dataRawLab.json()
// console.log("resLab", resLab);
// console.log("resLab.dataCieFull.labels", resLab.dataCieFull.labels);
        setCompany(resLab.dataCieFull);
        setVisibleLabel(false);
    };

// fonction pour overlay description = offers :
    const toggleOverlay = (value) => {
        setVisible(!visible);
        setValueToChange(value);
        if (value === 'description') {
            company.description && setInputOverlay(company.description);
        }
        if (value === 'offre') {
            setInputOverlay('');
        }
    };

// fonction pour overlay labels :
    const toggleOverlayLabel = () => {
        setVisibleLabel(!visibleLabel);
    };

    //overlay : 
    const handleOverlaySubmit = async () => {
        setVisible(!visible);
        let body = `token=YvbAvDg256hw2t5HfW_stG2yOt9BySaK`;
        if (valueToChange === 'description') {
            body += `&description=${inputOverlay}`
        }
        if (valueToChange === 'offre') {
            body += `&offer=${inputOverlay}`
        }
        const dataRaw = await fetch(`http://172.17.1.152:3000/companies/${companyId}`, { // renvoie jsute result, donc true ou flase
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        })
        var res = await dataRaw.json(); // true ou false
        if (res.result) {
            if (valueToChange == "offre") {
                props.navigation.navigate("OfferPage", {offerId:res.dataCieFull.offers[res.dataCieFull.offers.length-1]._id})
            }
            setCompany(res.dataCieFull);
        }
    }

// gestion displays selon data / !data : 
    if (company && company.companyImage) {
        displayCieImg = 
        <ImageBackground
            source={{uri: company.companyImage}}
            style={{ width: 400, height: 200 }} /* ATTENTION SIZING IMAGE A REVOIR */
        >
            <View style={{position:"absolute", bottom:"5%", right:"5%"}}>
                <ButtonText
                    color="light"
                    title="Modifier"
                />
            </View>
        </ImageBackground>
    } else {
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

    if (company && company.description) {
        displayDescCie = 
        <Card key={1} >
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Card.Title
                >Qui sommes-nous ?</Card.Title>
                <ButtonText
                    color="secondary"
                    title="Modifier"
                    onPress={(() => toggleOverlay("description"))}
                />
            </View>
            <Text>{company.description}</Text>
        </Card>
    } else {
        displayDescCie = 
        <Card key={1} >
            <Card.Title style={{textAlign:"left"}}
            >Qui sommes-nous ?</Card.Title>
                <View style={{backgroundColor: "#FAF0E6", height: 160, justifyContent:"center", alignItems:"center"}}>
                    <ButtonText
                        color="secondary"
                        title="Ajouter"
                        onPress={(() => toggleOverlay("description"))}
                    />
                </View>
        </Card>
    };

    if (company && company.labels.length > 0 ) {
        displayLabels = 
        <Card key={1} >
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Card.Title
                >Nos labels</Card.Title>
                <ButtonText
                    color="secondary"
                    title="Ajouter"
                    onPress={() => toggleOverlayLabel()}
                />
            </View>
            <View style={{display:"flex", flexDirection:"row"}}>
            {
                company.labels.map((label, i) => (
                    
                    <View style={{alignItems:"center"}} key={i}>
                        <View style={{marginBottom:10, paddingHorizontal:30}}>
                            <Image 
                                source={{ uri: `http://${REACT_APP_IPSERVER}/images/assets/${label.logo}`}} /// RECUP PAS IMAGE !!!!
                                style={{ width: 50, height: 50 }} /* PROBLEME AFFICHAGE TAILLE LOGO */
                            >
                            </Image>
                        </View>
                        <ButtonText
                            color="secondary"
                            title="Supprimer"
                            
                        />
                    </View>
                ))
            }
            </View>
        </Card>
    } else {
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
// console.log("label.logo", label.logo);
                                return ( 
                            <ListItem 
                                key={i} 
                                bottomDivider
                                >
                                <Image 
                                    source={{ uri: `http://${REACT_APP_IPSERVER}/images/assets/${label.logo}`}}
                                    style={{ width: 50, height: 50 }} /> 
                                    {/* PROBLEME AFFICHAGE TAILLE LOGO */}
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
                                    onPress={() => handleSubmitLabels(label._id)}
                                />
                            </ListItem>
                            )})
                        }

                    </View>
                </ScrollView>
                <Text></Text>
                
            </View>
        </Card>
    };

    if (company && company.offers) {
        displayOffers =
        <Card key={1} >
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Card.Title
                >Nos offres</Card.Title>
                <ButtonText
                    color="secondary"
                    title="Ajouter"
                    onPress={() => toggleOverlay("offre")}
                />
            </View>
                <View>
                {
                company.offers.map((offer, i) => 
                <OfferCardLight
                    key={i}
                    dataOffre={offer}/>
                )
                }
                </View>
        </Card>
    } else {
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
                    onPress={() => toggleOverlay("offre")}
                />
            </View>
        </Card>
    };

    return (

        <View style={{ flex: 1, justifyContent: 'center'}}>

        <Overlay overlayStyle={{ width: "80%", padding: 30, borderRadius: 20 }} isVisible={visible} onBackdropPress={() => toggleOverlay()}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <TextInput
                        placeholder={'Entrez votre ' + valueToChange}
                        value={inputOverlay}
                        multiline={true}
                        onChangeText={(value) => setInputOverlay(value)}
                        style={{ marginVertical: 30 }}
                    />
                    <Button
                        color="primary"
                        size="md"
                        title="Valider"
                        onPress={() => handleOverlaySubmit()}
                    />
                </KeyboardAvoidingView>
            </Overlay>

            <Overlay overlayStyle={{ width: "80%", padding: 30, borderRadius: 20 }} isVisible={visibleLabel} onBackdropPress={() => toggleOverlayLabel()}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                                    <ScrollView>
                    <View style={{flex: 1, width:300, height:400}}>
                        {
                            labels.map((label, i) => {
// console.log("label.logo", label.logo);
                                return ( 
                            <ListItem 
                                key={i} 
                                bottomDivider
                                >
                                <Image 
                                    source={{ uri: `http://${REACT_APP_IPSERVER}/images/assets/${label.logo}`}}
                                    style={{ width: 50, height: 50 }} /> 
                                    {/* PROBLEME AFFICHAGE TAILLE LOGO */}
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
                                    onPress={() => handleSubmitLabels(label._id)}
                                />
                            </ListItem>
                            )})
                        }

                    </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </Overlay>
            
            <HeaderBar
                title = {company ? company.companyName : "Entreprise"}
                onPress={() => onBackPress()}
                leftComponent
                locationIndication
                // location={label.offices[i].zipCode}
                >
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
