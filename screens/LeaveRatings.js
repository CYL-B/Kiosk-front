import React, { useState, useEffect } from 'react';
import { REACT_APP_IPSERVER } from '@env';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { HeaderBar } from '../components/Header'
import  CompanyCard  from '../components/CompanyCard'
import { Button, ButtonText } from "../components/Buttons";
import { Input, AirbnbRating } from 'react-native-elements';


const LeaveRatingsScreen = (props) => {

    //récupère les infos des inputs
    const [ rate, setRate ] = useState(0);
    const [ feedback, setFeedback ] = useState("");
    const [ pack, setPackage ] = useState("");
    const [ details, setDetails ] = useState("");

    // états infos Cie :
    const [ company, setCompany ] = useState(null);
    const [ companyId, setCompanyId ] = useState(props.route.params && props.route.params.companyId ? props.route.params.companyId : "61b097c526db20ecf9e66953");
    const [ token, setToken ] = useState("");
    const [ image, setImage ] = useState(null);

// useEffect d'initialisation de la page Company :
    useEffect(() => {

  // DANS USE : fonction chargement des infos de la compagnie loggée :
          async function loadDataCie() {
              // appel route put pour modifier données company
              var rawDataCie = await fetch(`http://${REACT_APP_IPSERVER}/companies/61b72b8f3ef976a3b8be1b09/token1`); // (`adresseIPserveur/route appelée/req.params?req.query`)
              var dataCie = await rawDataCie.json();
  console.log("dataCie", dataCie.company);
              if (dataCie.result) {
                  setCompany(dataCie.company); // set état company avec toutes data
                  setImage(dataCie.company.companyImage);
                  setToken(dataCie.company.token);
              }
          }
          loadDataCie();

        }, []);

    var addQuotation = async () => {
        //reçoit depuis offerpage : offerId, clientId, providerId(companies)
        const saveReq = await fetch(`http://${REACT_APP_IPSERVER}/quotations/add-quotation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `clientId=${clientId}&offerId=${offerId}&providerId=${providerId}&date=${new Date()}&sunshine=${sunshine}&area=${area}&pack=${pack}&details=${details}`
          
        }) 
        
      }

    const quoteRequest = ()=>{
      props.navigation.navigate("Quotation");
      addQuotation();
    }

if (company) {

    return (
    
    <View style={{flex:1, backgroundColor:"white"}}>

        <HeaderBar
          leftComponent
          title="Laissez votre avis"
          navigation={props.navigation}
        >
        </HeaderBar>

            <ScrollView style={{height:500, backgroundColor:"yellow"}}>

            {/* <KeyboardAvoidingView 
                behavior="position" 
                // contentContainerStyle={{alignItems: "center", paddingLeft:20, paddingRight: 20}}
            >
            </KeyboardAvoidingView> */}

            <View style={{flex:1, paddingBottom:80}}>
                <View style={{ top:10, paddingLeft:15, paddingRight: 15}}>
                <CompanyCard
                    navigation={props.navigation}
                    dataCompany={company}
                />
                </View>

                <View style={{backgroundColor:"pink", top:30, paddingLeft:15, paddingRight: 15}}>
                <Input
                  value={feedback}
                  label={`Décrivez votre expérience avec ${company.companyName}`}
                  // keyboardType="numeric"
                  placeholder='En quelques mots'
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <Input 
                    value={rate}
                    label={`Notez votre expérience avec ${company.companyName}`}
                    keyboardType="numeric"
                    labelStyle={{marginTop: 10}}
                    placeholder='Donnez une note de 1 à 10'
                    onChange={(e) => setRate(e.target.value)}
                />
                </View>

                <View style={{backgroundColor:"green", height:50, justifyContent:"center", top:50, paddingLeft:15, paddingRight: 15}}>
                <AirbnbRating
                    type="custom"
                    selectedColor="#F47805"
                    unSelectedColor="#F4780533"
                    reviewColor="#F47805"
                    defaultRating={3} //changer avec rating
                    isDisabled
                    count={5}
                    size={20}
                  showRating={false}
                />
                </View>

                <View style={{backgroundColor:"blue", top:50, paddingLeft:15, paddingRight: 15}}>
                  <Button 
                      title="Poster l'avis"
                      size="md"
                      color="primary"
                      onPress={() => quoteRequest()}
                  >
                  </Button>
                  <ButtonText 
                    title="Annuler" 
                    onPress={() => props.navigation.goBack()}
                  >
                  </ButtonText>
                </View>

            </View>

            </ScrollView>

    </View>
    )
              } else {
                return null
              }
};


export default LeaveRatingsScreen;

