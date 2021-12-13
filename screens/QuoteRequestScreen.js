import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView} from 'react-native';
import { HeaderBar } from '../components/Header'
import OfferCardLight from '../components/OfferCardLight';
import { Button, ButtonText } from "../components/Buttons";
import { REACT_APP_IPSERVER } from '@env';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { set } from 'react-native-reanimated';

const QuoteRequestScreen = (props) => {
//affichage de l'offre cliquée
    const[offer, setOffer] = useState({});

    //récupère les infos des inputs
    const[sunshine, setSunshine] = useState("");
    const[area, setArea]=useState("");
    const[forfait, setForfait] = useState("");
    const [details, setDetails] = useState("");

    //récupère les infos de offerpage au clic sur "demander un devis"
    // const { offerId } = props.route.params.offerId;
    // const{ providerId } = props.route.params.providerId

    // const[reqOfferId, setReqOfferId] = useState(offerId)
    // const[reqProviderId, setProviderId] = useState(providerId)
    
  //récupère le statut du devis depuis le back
  const[quoteStatus, setQuoteStatus] = useState("")

    //route qui permet d'afficher l'offre qui a été cliquée 
    useEffect(() => {
        const findOfferInfo= async () => {
            const data = await fetch(`http://${REACT_APP_IPSERVER}/quotations/quote-request/${props.user.token}/${reqOfferId}`)
            const body = await data.json();
            setOffer(body.offer)
        }; findOfferInfo()
    }, []);

    //route d'ajout d'un devis
    var addQuotation = async () => {
        //reçoit depuis offerpage : offerId, providerId(companies)
        // clientId=${props.user.companyId}&offerId=${offerId}&providerId=${providerId}
        const saveReq = await fetch(`http://${REACT_APP_IPSERVER}/quotations/add-quotation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `date=${new Date()}&sunshine=${sunshine}&area=${area}&forfait=${forfait}&details=${details}&clientId=${props.user.companyId}&offerId=${reqOfferId}&providerId=${providerId}&token=${props.user.token}`
          
        }) 
        const fromBack = await saveReq.json()
        setQuoteStatus(fromBack.quotationSaved.status)

      }

   const quoteRequest = ()=>{
    // props.navigation.navigate("StackNavigation", {screen : "Quotation"} {offerId: offerId}, {quoteStatus : quoteStatus});
    addQuotation();


   }

    return (<View style={{flex:1, backgroundColor:"white"}}>
        <HeaderBar
        leftComponent
        title="Demande de devis"
        navigation={props.navigation}
    >

    </HeaderBar>
    <ScrollView>
    <KeyboardAvoidingView behavior="position" contentContainerStyle={{alignItems: "center", paddingLeft:20,paddingRight: 20}}>
    <OfferCardLight
        
        dataOffre={offer} navigation={props.navigation}/>
        
        
<Input 
keyboardType="numeric"
labelStyle={{marginTop: 40, color: "#1A0842"}} label="Ensoleillement"
  placeholder='Notez de 1 à 10'
  onChangeText={(value) => setSunshine(value)}
  value={sunshine}
/>

<Input
label="Superficie"
labelStyle={{color: "#1A0842"}}
keyboardType="numeric"
  placeholder='La superficie de vos bureaux'
  onChangeText={(value) => setArea(value)}
  value={area}
/>
<Input
label="Forfait entretien"
labelStyle={{color: "#1A0842"}}
  placeholder='Êtes-vous intéressé par un forfait ?'
  onChangeText={(value) => setForfait(value)}
  value={forfait}
/>
<Input
label="Plus de détails"
labelStyle={{color: "#1A0842"}}

  placeholder='Autre chose à ajouter ?'
  multiline={true}
  placeholderStyle={{marginBottom: 40}}
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

