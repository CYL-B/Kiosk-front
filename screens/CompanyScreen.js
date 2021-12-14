import React, {useState, useEffect} from 'react';
import { View, ImageBackground, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Card, Image, ListItem, Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Text from "../components/Text";
import { ButtonText, Button } from '../components/Buttons';
import {HeaderBar} from '../components/Header'
import OfferCardLight from '../components/OfferCardLight';

import { REACT_APP_IPSERVER } from '@env'; // mettre à la place de notre url d'ip avec http:// devant = varibale d'environnement

import {connect} from 'react-redux';


const CompanyScreen = (props) => {

// variables de display :
    var displayCieImg; // aller chercher une image dans le téléhone du presta
    var displayDescCie; // input
    var displayLabels; // affichage en list des labels à ajouter
    var displayOffers; // aller cherche une offre en DB ?


// états infos Cie :
    const [ company, setCompany ] = useState(null);
    const [ companyId, setCompanyId ] = useState(props.route.params && props.route.params.companyId ? props.route.params.companyId : "61b097c526db20ecf9e66953");
    const [ token, setToken ] = useState("");
    const [ image, setImage ] = useState(null);

// état labels :
    const [ labels, setLabels ] = useState([]);

// états overlay :
    const [visible, setVisible] = useState(false);
    const [visibleLabel, setVisibleLabel] = useState(false);
    const [inputOverlay, setInputOverlay] = useState('');
    const [valueToChange, setValueToChange] = useState(null);

// useEffect de suivi d'états :
    useEffect(() => {
// console.log("suivi état company", company);
// console.log("zipcode", company.offices[0].zipCode);
    }, [company])

// useEffect d'initialisation de la page Company :
    useEffect(() => {

// DANS USE : fonction chargement des infos de la compagnie loggée :
        async function loadDataCie() {
            // appel route put pour modifier données company
            var rawDataCie = await fetch(`http://${REACT_APP_IPSERVER}/companies/${companyId}/${token}`); // (`adresseIPserveur/route appelée/req.params?req.query`)
            var dataCie = await rawDataCie.json();
// console.log("dataCie", dataCie);
            if (dataCie.result) {
                setCompany(dataCie.company); // set état company avec toutes data
                setImage(dataCie.company.companyImage);
                setToken(dataCie.company.token);
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


// Demande de l'autorisation d'accéder à la galerie d'image de l'utilisateur
let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return; // arrête la fonction
    }

    // on récupère l'uri de l'image et on la stocke dans un état
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if(pickerResult.uri) { // url stockage tel
        setImage(pickerResult.uri);
        var data = new FormData();
        data.append('image', {
            uri: pickerResult.uri,
            type: 'image/jpeg',
            name: 'image_header.jpg'
        });
        // requête pour héberger l'image de profil
        let resUpload = await fetch(`http://${REACT_APP_IPSERVER}/image`, {
            method: 'post',
            body: data
        })
        resUpload = await resUpload.json();

        // on ajoute l'url de l'image héberger au body de la prochaine requête
        if (resUpload.result) {
            let body = `token=${token}=${resUpload.url}`; // url cloudinary
            const dataRaw = await fetch(`http://${REACT_APP_IPSERVER}/companies/${companyId}`, { // renvoie jsute result, donc true ou flase
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body
            })
            var res = await dataRaw.json(); // true ou false
            if (res.result) {
                setCompany(res.dataCieFull);
            }
        }
    }
}

// fonction gestion labels :
    var handleSubmitLabels = async (labelId) => {
        const dataRawLab = await fetch(`http://${REACT_APP_IPSERVER}/companies/${companyId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `labelId=${labelId}&token=${token}`
        })
        var resLab = await dataRawLab.json()
// console.log("resLab", resLab);
// console.log("resLab.dataCieFull.labels", resLab.dataCieFull.labels);
        setCompany(resLab.dataCieFull); // les labels sont dans company
        setVisibleLabel(false);
    };

// fonction suprression labels :
    var handleDeleteLabels = async (labelId) => {
        const newCieLabels = await fetch(`http://${REACT_APP_IPSERVER}/companies/labels/${companyId}/${labelId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            // body: `labelId=${labelId}&token=YvbAvDg256hw2t5HfW_stG2yOt9BySaK`
        }); 
        var resLab = await newCieLabels.json();
        setCompany(resLab.dataLabelsCieUpdated);
    };

// fonction pour overlay description + offers :
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
        let body = `token=${token}`;
        if (valueToChange === 'description') {
            body += `&description=${inputOverlay}`
        }
        if (valueToChange === 'offre') {
            body += `&offerName=${inputOverlay}`
        }
        const dataRaw = await fetch(`http://${REACT_APP_IPSERVER}/companies/${companyId}`, { // renvoie jsute result, donc true ou flase
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        })
        var res = await dataRaw.json(); // true ou false
        if (res.result) {
// console.log('offerSaved', res.offerSaved);
            if (valueToChange == "offre" && res.offerSaved) {
                props.navigation.navigate("OfferPage", { offerId: res.offerSaved._id })
            }
            setCompany(res.dataCieFull);
        }
    }

// console.log(props.user.type);

// gestion displays selon data / !data : 
    if (company && company.companyImage) {
        displayCieImg = 
        <ImageBackground
            source={{uri: image}}
            style={{ height: 200 }} /* ATTENTION SIZING IMAGE A REVOIR */
        >
            { props.user.type === "partner" && (
            <View style={{position:"absolute", bottom:"5%", right:"5%", marginRight:15}}>
                <ButtonText
                    color="light"
                    title="Modifier"
                    onPress={() => openImagePickerAsync()}
                />
            </View>
            )}
        </ImageBackground>
    } else {
        displayCieImg = 
        <ImageBackground
            source={require('../assets/image_company_blank.png')}
            style={{ height: 200 }} /* ATTENTION SIZING IMAGE A REVOIR */
        >
            { props.user.type === "partner" && (
            <View style={{position:"absolute", bottom:"5%", right:"5%"}}>
                <ButtonText
                    color="light"
                    title="Ajouter"
                    onPress={() => openImagePickerAsync()}
                />
            </View>
            )}
        </ImageBackground>
    };

    if (company && company.description) {
        displayDescCie = 
        <Card key={1} containerStyle={styles.container}>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", left:5, marginRight:15}}>
                <Card.Title
                ><Text style={{ fontWeight: "bold" }}>Qui sommes-nous ?</Text></Card.Title>
                { props.user.type === "partner" && (
                <ButtonText
                    color="secondary"
                    title="Modifier"
                    onPress={(() => toggleOverlay("description"))}
                />
                )}
            </View>
            <Text
            style={{left:5}}
            >{company.description}</Text>
        </Card>
    } else {
        displayDescCie = 
        <Card key={1} containerStyle={styles.container}>
            <Card.Title style={{textAlign:"left"}}
            ><Text style={{ fontWeight: "bold" }}>Qui sommes-nous ?</Text></Card.Title>
                { props.user.type === "partner" && (
                <View style={{backgroundColor: "#FAF0E6", height: 160, justifyContent:"center", alignItems:"center"}}>
                    <ButtonText
                        color="secondary"
                        title="Ajouter"
                        onPress={(() => toggleOverlay("description"))}
                    />
                </View>
                )}
        </Card>
    };

    if (company && company.labels.length > 0 ) {
        displayLabels = 
        <Card key={1} containerStyle={styles.container} >
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", left:5, marginRight:15}}>
                <Card.Title
                ><Text style={{ fontWeight: "bold" }}>Nos labels</Text></Card.Title>
                { props.user.type === "partner" && (
                <ButtonText
                    color="secondary"
                    title="Ajouter"
                    onPress={() => toggleOverlayLabel()}
                />
                )}
            </View>
            <ScrollView horizontal >
            <View style={{display:"flex", flexDirection:"row"}}>
            {
                company.labels.map((label, i) => (
                    
                    <View style={{alignItems:"center"}} key={i}>
                        <View style={{marginBottom:10, paddingHorizontal:30}}>
                            <Image 
                                source={{ uri: `http://${REACT_APP_IPSERVER}/images/assets/${label.logo}`}} /// RECUP PAS IMAGE !!!!
                                style={{ width: 50, height: 50, resizeMode:"contain" }} /* PROBLEME AFFICHAGE TAILLE LOGO */
                                
                            >
                            </Image>
                        </View>
                        { props.user.type === "partner" && (
                        <ButtonText
                            color="secondary"
                            title="Supprimer"
                            onPress={() => handleDeleteLabels(label._id)}
                        />
                        )}
                    </View>
                ))
            }
            </View>
            </ScrollView>
        </Card>
    } else {
        displayLabels =
        <Card key={1} containerStyle={styles.container}>
            <Card.Title style={{textAlign:"left"}}
            ><Text style={{ fontWeight: "bold" }}>Nos labels</Text></Card.Title>
            { props.user.type === "partner" && (
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
                                    style={{ width: 50, height: 50, resizeMode:"contain" }} /> 
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
            )}
        </Card>
    };

    if (company && company.offers) {
        displayOffers =
        <Card key={1} containerStyle={styles.container} >
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", left:5, marginRight:15}}>
                <Card.Title
                ><Text style={{ fontWeight: "bold" }}>Nos offres</Text></Card.Title>
                { props.user.type === "partner" && (
                <ButtonText
                    color="secondary"
                    title="Ajouter"
                    onPress={() => toggleOverlay("offre")}
                />
                )}
            </View>
            <View>
                {
                company.offers.map((offer, i) => 
                <OfferCardLight
                    key={i}
                    dataOffre={offer} navigation={props.navigation}/>
                )
                }
            </View>
        </Card>
    } else {
        displayOffers =
        <Card key={1} containerStyle={styles.container} >
            <Card.Title style={{textAlign:"left"}}
            ><Text style={{ fontWeight: "bold" }}>Nos offres</Text></Card.Title>
            { props.user.type === "partner" && (
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
            )}
        </Card>
    };

    return (

        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>

        {/* OVERLAY description : */}
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
                <View
                    style={{alignItems:"center"}}>
                        <Button
                            color="primary"
                            size="md"
                            title="Valider"
                            onPress={() => handleOverlaySubmit()}
                        />
                </View>
            </KeyboardAvoidingView>
        </Overlay>

        {/* OVERLAY labels : */}  
        <Overlay overlayStyle={{ width: "80%", paddingVertical:30, paddingHorizontal:10, borderRadius: 20 }} isVisible={visibleLabel} onBackdropPress={() => toggleOverlayLabel()}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={{height:500}}>
                    <View style={{flex: 1}}>
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
                                    style={{ width: 50, height: 50, resizeMode:"contain" }} 
                                />
                                <ListItem.Content style={{flexDirection:"row"}}>
                                    <View >
                                        <ListItem.Title
                                            style={{right:10, flexShrink: 1, left:10}}>
                                            {label.labelName}
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
                onBackPress={() => props.navigation.navigate('Home')}
                leftComponent
                locationIndication
                location={company && company.offices.length > 0 ? company.offices[0].city+', '+company.offices[0].country : "Entreprise"}
                navigation={props.navigation}
                // location={label.offices[i].zipCode}
                user={props.user}
                >
            </HeaderBar>


        <ScrollView>

            {/* IMAGE ENTREPRISE */}
            <View style={{paddingBottom:10}}>
                {displayCieImg}
            </View>

            {/* CARD INFOS COMPANY */}
            <View style={{flex:1, paddingBottom:30}}>
                {displayDescCie}
            </View>

            {/* CARD LABELS COMPANY */}
            <View style={{flex:1, paddingBottom:30}}>
                {displayLabels}
            </View>

            <Button style={{ margin: 10 }} size="md" color="primary" title="AVIS" onPress={() => props.navigation.navigate('Rating', {companyId: "61b72b8f3ef976a3b8be1b09"})} />
            <Button style={{ margin: 10 }} size="md" color="primary" title="FEEDBACK" onPress={() => props.navigation.navigate('LeaveFeedback', {companyId: "61b72b8f3ef976a3b8be1b09"})} />

            {/* CARD OFFRES COMPANY */}
            <View style={{flex:1, paddingBottom:5}}>
                {displayOffers}
            </View>

            </ScrollView>

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        padding: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0, // Remove Shadow for Android
        marginBottom: 0
    },
})

// on récupère le user stocké dans le store : 
function mapStateToProps(state) {
      return { user: state.user }
    };

    export default connect(mapStateToProps, null)(CompanyScreen);
