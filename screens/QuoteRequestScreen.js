import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView} from 'react-native';
import { HeaderBar } from '../components/Header'
import OfferCardLight from '../components/OfferCardLight';
import { Button, ButtonText } from "../components/Buttons";
import { REACT_APP_IPSERVER } from '@env';
import { Input } from 'react-native-elements';


const QuoteRequestScreen = (props) => {

    // const[offerId, setOfferId] = useState(props.route.params.offerId)
    const[offer, setOffer] = useState({});

    //récupère les infos des inputs
    const[sunshine, setSunshine] = useState("");
    const[area, setArea]=useState("");
    const[package, setPackage] = useState("");
    const [details, setDetails] = useState("");

    //faire passer le token et offerId récupérés depuis "demander un devis"
    useEffect(() => {
        const findOfferInfo= async () => {
            const data = await fetch(`http://${REACT_APP_IPSERVER}/quotations/quote-request`)
            const body = await data.json();
            console.log(body)
            setOffer(body)
        }; findOfferInfo()
    }, []);

    var addQuotation = async () => {
        //reçoit depuis offerpage : offerId, clientId, providerId(companies)
        const saveReq = await fetch(`http://${REACT_APP_IPSERVER}/quotations/add-quotation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `clientId=${clientId}&offerId=${offerId}&providerId=${providerId}&date=${new Date()}&sunshine=${sunshine}&area=${area}&package=${package}&details=${details}`
          
        }) 
        
      }

   const quoteRequest = ()=>{
    props.navigation.navigate("Quotation");
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
labelStyle={{marginTop: 40}} label="Ensoleillement"
  placeholder='Notez de 1 à 10'
  onChange={(e) => setSunshine(e.target.value)}
  value={sunshine}
/>

<Input
label="Superficie"
keyboardType="numeric"
  placeholder='La superficie de vos bureaux'
  onChange={(e) => setArea(e.target.value)}
  value={area}
/>
<Input
label="Forfait entretien"
  placeholder='Êtes-vous intéressé par un forfait ?'
  onChange={(e) => setPackage(e.target.value)}
  value={package}
/>
<Input
label="Plus de détails"

  placeholder='Autre chose à ajouter ?'
  multiline={true}
  placeholderStyle={{marginBottom: 40}}
  onChange={(e) => setDetails(e.target.value)}
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
export default QuoteRequestScreen;

