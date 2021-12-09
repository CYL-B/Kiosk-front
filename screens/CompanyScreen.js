import React, {useState, useEffect} from 'react';
import { View, Text, ImageBackground, TextInput } from 'react-native';
import { Card, Image, Input, ListItem, Overlay } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

import { ButtonText } from '../components/Buttons';
import {HeaderBar} from '../components/Header'

import { REACT_APP_IPSERVER } from '@env'; // mettre à la place de notre url d'ip avec http:// devant = varibale d'environnement

import {connect} from 'react-redux';


const CompanyScreen = (props) => {

    var data = "";
// variables de display :
    var displayCieImg; // aller chercher une image dans le téléhone du presta
    var displayDescCie; // input
    var displayLabels; // affichage en list des labels à ajouter
    var displayOffers; // aller cherche une offre en DB ?

// états description Cie :
    const [ descCie, setDescCie ] = useState("");
    const [ descOk, setDescOk ] = useState(false);

// états infos Cie :
    const [ companyId, setCompanyId ] = useState("");
    const [ nameCie, setNameCie ] = useState("");
    const [ addressCie, setAddressCie ] = useState([]);

// états labels :
    const [ labels, setLabels ] = useState([]);
    const [ cieOwnLabels, setCieOwnLabels ] = useState([]);

// états overlay :
    const [visible, setVisible] = useState(false);
    const [inputOverlay, setInputOverlay] = useState('');
    const [valueToChange, setValueToChange] = useState(null);

    useEffect(() => {
console.log("suivi état descCie", descCie);
console.log("suivi état descOk", descOk);
console.log("suivi état cieOwnLabels", cieOwnLabels);
console.log("suivi état addressCie", addressCie);
    }, [descCie, descOk, cieOwnLabels, addressCie])

// useEffect d'initialisation de la page Company :
    useEffect(() => {
        // const { cieId } = props.route.params; // récupération de l'id cie via la navigation
        var cieId = "61ae3cbd7f3164baaccf2c6a";
        setCompanyId(cieId);

// DANS USE : fonction chargement des infos de la compagnie loggée :
        async function loadDataCie() {
            // appel route put pour modifier données company
            var rawDataCie = await fetch(`http://${REACT_APP_IPSERVER}/companies/${cieId}/YvbAvDg256hw2t5HfW_stG2yOt9BySaK`); // (`adresseIPserveur/route appelée/req.params?req.query`)
            var dataCie = await rawDataCie.json();
            setDescCie(dataCie.company.description);
// console.log("dataCie", dataCie.company.description);
            setNameCie(dataCie.company.companyName);
            setAddressCie(...addressCie, dataCie.company.offices)
            if (dataCie.company.description) {
                setDescOk(true);
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

// DANS USE : fonction chargement des labels de la cie :
        async function loadDataCieOwnLabels() {
            const dataRawLab = await fetch(`http://${REACT_APP_IPSERVER}/companies/${cieId}/YvbAvDg256hw2t5HfW_stG2yOt9BySaK`)
            var resLab = await dataRawLab.json()
// console.log("resLab", resLab.company.labels);
            setCieOwnLabels(resLab.company.labels);
        }
        loadDataCieOwnLabels();
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
        const dataRawLab = await fetch("http://172.17.1.152:3000/companies/61ae3cbd7f3164baaccf2c6a", {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `labelId=${labelId}&token=YvbAvDg256hw2t5HfW_stG2yOt9BySaK`
        })
        var resLab = await dataRawLab.json()
// console.log("resLab", resLab);
// console.log("resLab.dataCieFull.labels", resLab.dataCieFull.labels);
        setCieOwnLabels(resLab.dataCieFull.labels);
    };

// fonction pour overlay :
    const toggleOverlay = (value) => {
        setVisible(!visible);
        setValueToChange(value);
    };

// overlay :
    const OverlayComponent = () => {
// console.log(valueToChange);
        if(valueToChange === 'description') {
            var descOverlay = 
            <View>
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

        }
        if(visible) {
            return (
                <Overlay overlayStyle={{ width: "80%", padding: 30, borderRadius: 20 }} isVisible={visible} onBackdropPress={(() => toggleOverlay())}>
                    <Text>Modifier {valueToChange}</Text>
                    {descOverlay}
                </Overlay>
            )
        } else {
            return null;
        }
    }

// gestion displays selon data / !data : 
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
                    onPress={(() => toggleOverlay("description"))}
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
                    {/* <Input
                        style={{ fontSize: 15 }}
                        inputContainerStyle={{width:'80%', marginLeft:'18%', right:20}} // !!! CENTRE A L'ARRACHE
                        value={descCie}
                        placeholder="Veuillez ajouter une description"
                        onChangeText={(e) => setDescCie(e)}
                    /> */}
                    <ButtonText
                        color="secondary"
                        title="Ajouter"
                        onPress={(() => toggleOverlay("description"))}
                    />
                </View>
        </Card>
    };

    if (cieOwnLabels.length > 0 ) {
        displayLabels = 
        <Card key={1} >
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Card.Title
                >Nos labels</Card.Title>
                <ButtonText
                    color="secondary"
                    title="Ajouter"
                    onPress={() => handleSubmitLabels()}
                />
            </View>
            <View style={{display:"flex", flexDirection:"row"}}>
            {
                cieOwnLabels.map((label, i) => (
                    
                    <View style={{alignItems:"center"}} key={1}>
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

        <OverlayComponent/>
        
        {
            addressCie.map((label, i) => {
// console.log("addressCie", addressCie);
// console.log("{label.offices[i].zipCode}", label.offices[i].zipCode);
            return ( 
            <HeaderBar
                title = {nameCie}
                onPress={() => onBackPress()}
                leftComponent
                locationIndication
                navigation={props.navigation}
                // location={label.offices[i].zipCode}
                >
            </HeaderBar>
            )})
        }

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
