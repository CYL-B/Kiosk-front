import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Switch } from "react-native";
import { HeaderBar } from "../../components/Header";
import OfferCard from "../../components/OfferCardLight";
import CompanyCard from "../../components/CompanyCard";

//import du switch
import Toggle from "react-native-toggle-element";

import { connect } from "react-redux";
import { REACT_APP_IPSERVER } from "@env";

const FavoriteScreen = (props) => {
  const [toggleValue, setToggleValue] = useState(false),
        [favoriteOffers, setFavoriteOffers] = useState([]),
        [favoriteCompanies, setFavoriteCompanies] = useState([]);

  useEffect(() => {
    const loadData = async () => {
        let offersId = props.user.favorites.filter(e => e.offerId);
        setFavoriteOffers([]);
        setFavoriteCompanies([]);
        for(let i = 0; i < offersId.length; i++) {
            console.log('offerId', offersId[i]);
            var rawDataOffer = await fetch(`http://${REACT_APP_IPSERVER}/offers/${offersId[i].offerId}/${props.user.token}`); // (`adresseIPserveur/route appelée/req.params?req.query`)
            var res = await rawDataOffer.json();
            let offer;
            if (res.result) {
                offer = res.offer;
                console.log('offer', offer);
            }
            setFavoriteOffers([...favoriteOffers, <OfferCard dataOffre={offer} navigation={props.navigation} key={i} />]);
        };
        let companiesId = props.user.favorites.filter(e => e.companyId);
        for(let i = 0; i < companiesId.length; i++) {
            console.log('companiesId', companiesId[i]);
            var rawDataOffer = await fetch(`http://${REACT_APP_IPSERVER}/companies/${companiesId[i].companyId}/${props.user.token}`); // (`adresseIPserveur/route appelée/req.params?req.query`)
            var res = await rawDataOffer.json();
            let company;
            if (res.result) {
                company = res.company;
                console.log('company', company);
            }
            setFavoriteCompanies([...favoriteCompanies, <CompanyCard dataCompany={company} navigation={props.navigation} key={i} />]);
        };
    }
    loadData();
  }, []);

  const toggleSwitch = () => setToggleValue(previousState => !previousState);

  console.log("favoriteOffers", favoriteOffers);
  console.log("favoriteCompanies", favoriteCompanies);

  if (!toggleValue && favoriteOffers) {
    console.log('offer side');
    let leftComponentDisplay = (
      <Text style={{ color: "white", fontWeight: "bold" }}>Offre</Text>
    );
    let rightComponentDisplay = (
      <Text style={{ color: "#1A0842", fontWeight: "bold" }}>Entreprise</Text>
    );
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <HeaderBar
          title="Offres"
          navigation={props.navigation}
          user={props.user}
        ></HeaderBar>

        <View style={{ alignItems: "center", marginTop: 10 }}>
          {/* <Toggle
            value={toggleValue}
            onPress={(newState) => setToggleValue(newState)}
            leftComponent={leftComponentDisplay}
            thumbButton={{
              width: 175,
              height: 50,
              radius: 30,
              activeBackgroundColor: "#F47805",
              inActiveBackgroundColor: "#F47805",
            }}
            rightComponent={rightComponentDisplay}
            trackBar={{
              width: 350,
              activeBackgroundColor: "#FAF0E6",
              inActiveBackgroundColor: "#FAF0E6",
            }}
          /> */}
          <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={toggleValue ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={toggleValue}
            />
        </View>
        <ScrollView>{favoriteOffers}</ScrollView>
      </View>
    );
  } else if(toggleValue && favoriteCompanies) {
    let leftComponentDisplay = (
      <Text style={{ color: "#1A0842", fontWeight: "bold" }}>En cours</Text>
    );
    let rightComponentDisplay = (
      <Text style={{ color: "white", fontWeight: "bold" }}>Passés</Text>
    );

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <HeaderBar
          title="Entreprises"
          navigation={props.navigation}
          user={props.user}
        ></HeaderBar>

        <View style={{ alignItems: "center", marginTop: 10 }}>
          {/* <Toggle
            value={toggleValue}
            onPress={(newState) => setToggleValue(newState)}
            leftComponent={leftComponentDisplay}
            thumbButton={{
              width: 175,
              height: 50,
              radius: 30,
              activeBackgroundColor: "#F47805",
              inActiveBackgroundColor: "#F47805",
            }}
            rightComponent={rightComponentDisplay}
            trackBar={{
              width: 350,
              activeBackgroundColor: "#FAF0E6",
              inActiveBackgroundColor: "#FAF0E6",
            }}
          /> */}
          <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={toggleValue ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={toggleValue}
            />
        </View>
        <ScrollView>{favoriteCompanies}</ScrollView>
      </View>
    );
  } else {
      return null
  }
};

function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps, null)(FavoriteScreen);
