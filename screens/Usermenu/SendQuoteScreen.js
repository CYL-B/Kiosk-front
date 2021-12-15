import React, { useState, useEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Text} from "react-native";
import { HeaderBar } from "../../components/Header";
import OfferCardLight from "../../components/OfferCardLight";
import { Button, ButtonText } from "../../components/Buttons";
import { REACT_APP_IPSERVER } from '@env';
import { connect } from 'react-redux';

const SendQuoteScreen = (props) => {

  const[reqQuoteId, setReqQuoteId] = useState(props.route.params.quoteId)
  const[answers, setAnswers]= useState([]);
  const[quotation, setQuotation] = useState(null);
  const[offer, setOffer] = useState(null)
  const [quoteStatus, setQuoteStatus] = useState("");


  
  useEffect(() => {
    const findQuotationInfo = async () => {
      const data = await fetch(`http://${REACT_APP_IPSERVER}/quotations/quotation-info/${props.user.token}/${reqQuoteId}`)
      const body = await data.json();
      setAnswers(body.answers)
      setQuotation(body.quotationFromBack)
      setOffer(body.offer)

    }; findQuotationInfo();

  }, []);


  //route de modification d'un devis à "envoyé"
  var sendQuotation = async () => {

    const saveReq = await fetch(`http://${REACT_APP_IPSERVER}/quotations/send-quotation`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `quoteId=${reqQuoteId}&token=${props.user.token}`

    })
    const fromBack = await saveReq.json()
    setQuoteStatus(fromBack.quotationToSend.status)

  }

  const sendQuote = () => {
    sendQuotation();
    // props.navigation.goBack();
    
  }
console.log("answers", answers)

var answersToDisplay = answers.map((answer, i)=>{
  return(
  <View><Text>{answer.question}</Text>
  <Text>{answer.answer}</Text></View>)
})


  return (<View style={{ flex: 1, backgroundColor: "white" }}>
    <HeaderBar
      onBackPress={() => props.navigation.goBack()}
      leftComponent
      title="Envoyer le devis"
      navigation={props.navigation}
      user={props.user}
    >

    </HeaderBar>

    <ScrollView contentContainerStyle={{ alignItems: "center", paddingLeft: 20, paddingRight: 20 }}>
    {answersToDisplay}


        <View><Button
          title="Envoyer le devis"

          size="md"
          color="primary"
          onPress={() => sendQuote()}
        ></Button></View>
        <ButtonText title="Annuler"
          onPress={() => props.navigation.goBack()}
        ></ButtonText>

      
    </ScrollView>
  </View>
  )
}

function mapStateToProps(state) {
  return { user: state.user }
}
export default connect(mapStateToProps, null)(SendQuoteScreen)

