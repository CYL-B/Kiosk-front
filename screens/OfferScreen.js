import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Card, ListItem, Overlay } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import { LinearGradient } from 'expo-linear-gradient';

import { AntDesign } from '@expo/vector-icons';

import { Button, ButtonText } from '../components/Buttons';
import { HeaderBar } from '../components/Header';

import { REACT_APP_IPSERVER } from '@env'; // mettre à la place de notre url d'ip avec http:// devant = varibale d'environnement

import { connect } from 'react-redux';

import CompanyCard from '../components/CompanyCard';


const OfferScreen = (props) => {

    var data = "";
    var displayOfferImg; // aller chercher une image dans le téléhone du presta
    var displayDescOffer; // input
    var displayLabels; // affichage en list des labels à ajouter
    var displayOffers; // aller cherche une offre en DB ?

    const [offer, setOffer] = useState(null),
        [company, setCompany] = useState(null),
        [offerId, setOfferId] = useState(props.route.params && props.route.params.offerId ? props.route.params.offerId : "61b0e6837ee15e4f2a1a936f" ),
        [token, setToken] = useState("YvbAvDg256hw2t5HfW_stG2yOt9BySaK"),
        [visible, setVisible] = useState(false),
        [inputOverlay, setInputOverlay] = useState(''),
        [valueToChange, setValueToChange] = useState(null),
        [image, setImage] = useState(null);

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
            marginBottom: 0,
            padding: 0
        },
    })


    useEffect(() => {
        // setToken(props.user.token);
        //setOfferId(props.route.params.offerId);
        async function loadDataOffer() {
            // appel route put pour modifier données offer
            var rawDataOffer = await fetch(`http://${REACT_APP_IPSERVER}/offers/${offerId}/${token}`); // (`adresseIPserveur/route appelée/req.params?req.query`)
            var res = await rawDataOffer.json();
            if (res.result) {
                setOffer(res.offer);
                setCompany(res.company);
                setImage(res.offer.offerImage);
            }
        }
        loadDataOffer();
    }, []);

    const toggleOverlay = (value) => {
        setVisible(!visible);
        setValueToChange(value);
        if (value === 'description') {
            offer.description && setInputOverlay(offer.description);
        }
        if (value === 'engagement') {
            setInputOverlay('');
        }
    };

    // Demande de l'autorisation d'accéder à la galerie d'image de l'utilisateur
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        // on récupère l'uri de l'image et on la stocke dans un état
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if(pickerResult.uri) {
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
                let body = `token=${token}&image=${resUpload.url}`;
                const dataRaw = await fetch(`http://${REACT_APP_IPSERVER}/offers/${offerId}`, { // renvoie jsute result, donc true ou flase
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: body
                })
                var res = await dataRaw.json(); // true ou false
                if (res.result) {
                    setOffer(res.offer);
                }
            }
        }
    }

    const handleContactClick = async () => {
        let body = `token=${token}&receiverId=${company._id}&senderId=${props.user.companyId}`;
        const dataRaw = await fetch(`http://${REACT_APP_IPSERVER}/conversations/new`, { // renvoie jsute result, donc true ou flase
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        })
        var res = await dataRaw.json(); // true ou false
        if (res.result) {
            props.navigation.navigate('Chat', {convId: res.conversation._id});
        }
    }

    const handleCommitmentDelete = async (commitmentId) => {
        let body = `token=${token}&commitmentId=${commitmentId}`;
        const dataRaw = await fetch(`http://${REACT_APP_IPSERVER}/offers/${offerId}`, { // renvoie jsute result, donc true ou flase
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        })
        var res = await dataRaw.json(); // true ou false
        if (res.result) {
            setOffer(res.offer);
        }
    }

    const handleOverlaySubmit = async () => {
        setVisible(!visible);
        let body = `token=${token}`;
        if (valueToChange === 'description') {
            body += `&description=${inputOverlay}`
        }
        if (valueToChange === 'engagement') {
            body += `&commitment=${inputOverlay}`
        }
        const dataRaw = await fetch(`http://${REACT_APP_IPSERVER}/offers/${offerId}`, { // renvoie jsute result, donc true ou flase
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        })
        var res = await dataRaw.json(); // true ou false
        if (res.result) {
            setOffer(res.offer);
        }
    }

    if (image) {
        displayOfferImg =
            <ImageBackground
                source={{ uri: image }}
                style={{ height: 200 }} /* ATTENTION SIZING IMAGE A REVOIR */
            >
                { props.user.type === "partner" && (
                <View style={{ position: "absolute", bottom: "5%", right: "5%" }}>
                    <ButtonText
                        color="light"
                        title="Modifier"
                        onPress={() => openImagePickerAsync()}
                    />
                </View>
                )}
            </ImageBackground>
    } else {
        displayOfferImg =
            <ImageBackground
                source={require('../assets/image_company_blank.png')}
                style={{ width: 400, height: 200 }} /* ATTENTION SIZING IMAGE A REVOIR */
            >
                { props.user.type === "partner" && (
                <View style={{ position: "absolute", bottom: "5%", right: "5%" }}>
                    <ButtonText
                        color="light"
                        title="Ajouter"
                        onPress={() => openImagePickerAsync()}
                    />
                </View>
                )}
            </ImageBackground>
    };

    if (offer && offer.description) {
        displayDescOffer =
            <Card key={1} containerStyle={styles.container}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Card.Title
                    >Ce que nous proposons</Card.Title>
                    { props.user.type === "partner" && (
                    <ButtonText
                        color="secondary"
                        title="Modifier"
                        onPress={() => toggleOverlay('description')}
                    />
                    )}
                </View>
                <Text>{offer.description}</Text>
            </Card>

    } else {
        displayDescOffer =
            <Card key={1} containerStyle={styles.container}>
                <Card.Title style={{ textAlign: "left" }}
                >Ce que nous proposons</Card.Title>
                { props.user.type === "partner" && (
                <View style={{ backgroundColor: "#FAF0E6", height: 160, justifyContent: "center", alignItems: "center" }}>
                    <ButtonText
                        color="secondary"
                        title="Ajouter une description"
                        onPress={() => toggleOverlay('description')}
                    />
                </View>
                )}
            </Card>
    };

    if (offer && offer.commitments.length > 0) {
        displayLabels =
            <Card key={1} containerStyle={styles.container}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Card.Title
                    >Nos engagements</Card.Title>
                    { props.user.type === "partner" && (
                    <ButtonText
                        color="secondary"
                        title="Ajouter"
                        onPress={() => toggleOverlay('engagement')}
                    />
                    )}
                </View>
                <View>
                    {offer.commitments.map((l, i) => (
                        <ListItem key={i}>
                            <AntDesign name="check" size={24} color="black" />
                            <ListItem.Content>
                                <ListItem.Title>{l.commitment}</ListItem.Title>
                            </ListItem.Content>
                            { props.user.type === "partner" && (
                            <AntDesign onPress={() => handleCommitmentDelete(l._id)} name="delete" size={24} color="black" />
                            )}
                        </ListItem>
                    ))}
                </View>
            </Card>
    } else {
        displayLabels =
            <Card key={1} containerStyle={styles.container}>
                <Card.Title style={{ textAlign: "left" }}
                >Nos engagements</Card.Title>
                { props.user.type === "partner" && (
                <View style={{ backgroundColor: "#FAF0E6", height: 160, justifyContent: "center", alignItems: "center" }}>
                    <ButtonText
                        color="secondary"
                        title="Ajouter des engagements"
                        onPress={() => toggleOverlay('engagement')}
                    />
                </View>
                )}
            </Card>
    };
    if (company) {
        displayOffers = (
            <Card key={1} containerStyle={styles.container}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Card.Title
                    >Qui sommes-nous ?</Card.Title>
                </View>
                <CompanyCard dataCompany={company} navigation={props.navigation} />
            </Card>
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
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
            <HeaderBar
                title={offer && offer.offerName ? offer.offerName : 'No name'}
                onBackPress={() => props.navigation.goBack()}
                leftComponent
                navigation={props.navigation}
                locationIndication
                user={props.user}
                location={company && company.offices && company.offices.length > 0 && company.offices[0].city+', '+company.offices[0].country}>
            </HeaderBar>

            <ScrollView>

                {/* IMAGE ENTREPRISE */}
                <View>
                    {displayOfferImg}
                </View>

                {/* CARD INFOS COMPANY */}
                <View style={{ flex: 1 }}>
                    {displayDescOffer}
                </View>

                {/* CARD LABELS COMPANY */}
                <View style={{ flex: 1 }}>
                    {displayLabels}
                </View>

                {/* CARD OFFRES COMPANY */}
                <View style={{ flex: 1, paddingBottom: 60 }}>
                    {displayOffers}
                </View>

            </ScrollView>
            <LinearGradient
            style={{height: 60, zIndex: 2, position: 'absolute', bottom: 0, left: 0, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", paddingHorizontal: 40}}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
            >
                <Button color="secondary" size="md" title="Contacter" onPress={() => handleContactClick()} />
            </LinearGradient>

        </View>
    );

};

// on récupère le user stocké dans le store : 
function mapStateToProps(state) {
    return { user: state.user }
};
export default connect(mapStateToProps, null)(OfferScreen);
