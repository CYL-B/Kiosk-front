import React, { useState, useEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, Alert } from "react-native";
import { HeaderBar } from "../components/Header";
import OfferCardLight from "../components/OfferCardLight";
import { Button, ButtonText } from "../components/Buttons";
import { REACT_APP_IPSERVER } from '@env';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { set } from 'react-native-reanimated';

const QuoteRequestScreen = (props) => {
  //affichage de l'offre cliquée
  const [offer, setOffer] = useState({});

  //récupère les infos des inputs
  const [sunshine, setSunshine] = useState("");
  const [area, setArea] = useState("");
  const [forfait, setForfait] = useState("");
  const [details, setDetails] = useState("");

  //récupère les infos de offerpage au clic sur "demander un devis"


  const [reqOfferId, setReqOfferId] = useState(props.route.params.offerId)
  const [reqProviderId, setReqProviderId] = useState(props.route.params.providerId)


  //récupère le statut du devis depuis le back
  const [quoteStatus, setQuoteStatus] = useState("");
  const [error, setError] = useState("");


  //route qui permet d'afficher l'offre qui a été cliquée et de vérifier si le client a déjà fait une demande de devis pour cette offre
  useEffect(() => {
    const findOfferInfo = async () => {
      const data = await fetch(`http://${REACT_APP_IPSERVER}/quotations/quote-request/${props.user.token}/${reqOfferId}/${props.user.companyId}`)
      const body = await data.json();
      setOffer(body.offer);
      setError(body.erreur);

      console.log("erreur",error)

    }; findOfferInfo();

  }, []);


console.log("erreur", error)
//message d'alerte lorsque le client a déjà demandé un devis pour cette offre
  if (error == "Vous avez déjà demandé un devis pour cette offre. Voulez-vous redemander un devis ?") {

    const createTwoButtonAlert = () =>
      Alert.alert('Alerte', 'Vous avez déjà demandé un devis pour cette offre. Voulez-vous redemander un devis ?', [
        {
          text: 'Non',
          onPress: () => props.navigation.goBack(),
          style: 'cancel',
        },
        { text: 'Oui', onPress: () => console.log('OK Pressed') },
      ]);

    createTwoButtonAlert();
    setError("")
  }

  //route d'ajout d'un devis
  var addQuotation = async () => {
    //reçoit depuis offerpage : offerId, providerId(companies)

    const saveReq = await fetch(`http://${REACT_APP_IPSERVER}/quotations/add-quotation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `date=${new Date()}&sunshine=${sunshine}&area=${area}&forfait=${forfait}&details=${details}&clientId=${props.user.companyId}&offerId=${reqOfferId}&providerId=${reqProviderId}&token=${props.user.token}}`

    })
    const fromBack = await saveReq.json()
    setQuoteStatus(fromBack.quotationSaved.status)

  }

  const quoteRequest = () => {
    props.navigation.navigate("Quotation", { offerId: reqProviderId, quoteStatus: quoteStatus });
    addQuotation();
  }



  return (<View style={{ flex: 1, backgroundColor: "white" }}>
    <HeaderBar
      onBackPress={() => props.navigation.goBack()}
      leftComponent
      title="Demande de devis"
      navigation={props.navigation}
      user={props.user}
    >

    </HeaderBar>

    <ScrollView>
      <KeyboardAvoidingView behavior="position" contentContainerStyle={{ alignItems: "center", paddingLeft: 20, paddingRight: 20 }}>
        <OfferCardLight

          dataOffre={offer} navigation={props.navigation} />



        <Input
          keyboardType="numeric"
          labelStyle={{ marginTop: 40, color: "#1A0842" }} label="Ensoleillement"
          placeholder='Notez de 1 à 10'
          onChangeText={(value) => setSunshine(value)}
          value={sunshine}
        />

        <Input
          label="Superficie"
          labelStyle={{ color: "#1A0842" }}
          keyboardType="numeric"
          placeholder='La superficie de vos bureaux en m2'
          onChangeText={(value) => setArea(value)}
          value={area}
        />
        <Input
          label="Forfait entretien"
          labelStyle={{ color: "#1A0842" }}
          placeholder='Êtes-vous intéressé par un forfait ?'
          onChangeText={(value) => setForfait(value)}
          value={forfait}
        />
        <Input
          label="Plus de détails"
          labelStyle={{ color: "#1A0842" }}

          placeholder='Autre chose à ajouter ?'
          multiline={true}
          placeholderStyle={{ marginBottom: 40 }}
          onChangeText={(value) => setDetails(value)}
          value={details}
        />


        <View><Button
          title="Envoyer la demande"

          size="md"
          color="primary"
          onPress={() => quoteRequest()}
        ></Button></View>
        <ButtonText title="Annuler"
          onPress={() => props.navigation.goBack()}
        ></ButtonText>

      </KeyboardAvoidingView>
    </ScrollView>
  </View>
  )
}

function mapStateToProps(state) {
  return { user: state.user }
}
export default connect(mapStateToProps, null)(QuoteRequestScreen)

