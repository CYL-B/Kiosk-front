import React, { useState, useEffect } from 'react'
//Store
import { connect } from 'react-redux';
//Var de connexion
import { REACT_APP_IPSERVER } from '@env'

//import de la librairie gifted chat avec ses éléments
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { HeaderBar } from '../components/Header'
import { Divider, Badge, AirbnbRating } from 'react-native-elements';
import { AvatarRound } from '../components/avatar'
import { ScrollView } from 'react-native-gesture-handler';


const RatingScreen = (props) => {

    // états infos pour récupérer ratings :
    const [ companyId, setCompanyId ] = useState(props.route.params && props.route.params.companyId ? props.route.params.companyId : "61b70f79caba4a7eea2a8206"); // pramaètre envoyé depuis la page précéndete via props.navigattion.navigate
    const [ token, setToken ] = useState(props.user && props.user.token ? props.user.token : "eY9zt44G4iHEQ2s8YKqJuDUJv0-8HXKa"); // si user exist + token exist > j'envoie le token du MAPSTATE ou celui en dur
    const [ ratings, setRatings ] = useState([]);


    // useEffect d'initialisation de la page Company :
    useEffect(() => {

// DANS USE : fonction chargement des infos de la compagnie loggée :
        async function loadDataCie() {
            // appel route put pour modifier données company
            var rawRatings = await fetch(`http://${REACT_APP_IPSERVER}/ratings/${companyId}/${token}`); // (`adresseIPserveur/route appelée/req.params?req.query`)
            var dataRatings = await rawRatings.json(); 
// console.log("dataRatings.ratings", dataRatings.ratings); // = ARRAY d'OBJETS
            if (dataRatings.result) {
                setRatings(dataRatings.ratings);
            }
        }
        loadDataCie();

    }, []);

    const dateFormat = function (date) {
        var newDate = new Date(date);
        var format =
            newDate.getDate() +
            "/" +
            (newDate.getMonth() + 1) +
            "/" +
            newDate.getFullYear();
        return format;
    };
// console.log("état ratings", ratings);
    return (
    
    <View style={{ flex: 1, backgroundColor: "white" }}>

        <HeaderBar
            title = {ratings && ratings.length > 0 ? ratings[0].clientId.companyName : "Entreprise"}
            onBackPress={() => props.navigation.goBack()}
            leftComponent
            locationIndication
            location="Paris"
            user={props.user}
            onBackPress={() => props.navigation.goBack()}
        >
        </HeaderBar>

        <Divider 
            style={{ 
                backgroundColor: '#FAF0E6', 
                height: 80, 
                justifyContent: "center", 
                alignItems: "flex-start",
                
            }}>
            <View
                style={{left:10}}>
                <Text style={{ fontSize: 20, color: "#1A0842", marginLeft: 10 }}
                    >{ratings.length} commentaires
                </Text>
                <View style={{display:"flex", flexDirection:"row", left:8}}>
                    <AirbnbRating style={{left:10}}
                        selectedColor="#F47805"
                        unSelectedColor="#F4780533"
                        reviewColor="#F47805"
                        defaultRating={3} //changer avec rating
                        isDisabled
                        count={5}
                        size={20}
                        showRating={false}
                    />
                    <Text style={{ fontSize: 20, color: "#1A0842", marginLeft: 10 }}
                        > NOTE MOYENNE
                    </Text>
                </View>
            </View>
        </Divider>

        <ScrollView >

            { 
            ratings.map(function(e, i) {
// console.log("e", e);
                return (
            <View style={{paddingBottom:30}} key={i}>
                <View style={{display:"flex", flexDirection:"row", left:15, marginTop:20, marginRight:30}}>
                    <AvatarRound 
                        navigation={props.navigation} size="md"
                        source={{ uri: e.userId.avatar }}
                    >
                    </AvatarRound>
                    <View style={{left:10}}>
                        <Text
                            >{e.userId.firstName} {e.userId.lastName}
                        </Text>
                        <Text
                            >
                                {e.clientId.companyName} - {dateFormat(e.dateRating)}
                        </Text>
                    </View>
                </View>
                <View style={{display:"flex", flexDirection:"column",left:15}}>
                    {/* <View style={{marginRight:30, backgroundColor:"blue"}}> */}
                        <Text style={{flexShrink: 1, top:10, marginRight:30}}
                            >{e.feedback}
                        </Text>
                    {/* </View> */}
                        <View style={{ alignItems:"flex-start", top:15, marginRight:30}}>
                        <AirbnbRating 
                        style={{marginTop:10}}
                            selectedColor="#F47805"
                            unSelectedColor="#F4780533"
                            reviewColor="#F47805"
                            defaultRating={e.rating} //changer avec rating
                            isDisabled
                            count={5}
                            size={20}
                            showRating={false}
                        />
                        </View>
                </View>
            </View>
            )})
            }

        </ScrollView>

    </View>
    )
};


// on récupère le user stocké dans le store : 
function mapStateToProps(state) {
      return { user: state.user }
    };

    export default connect(mapStateToProps, null)(RatingScreen);