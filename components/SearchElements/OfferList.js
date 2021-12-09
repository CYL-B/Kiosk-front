import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";

import { connect } from "react-redux";

import { REACT_APP_IPSERVER } from "@env";

import OfferCardMain from "../OfferCardMain";
//import OfferCardLight from "../OfferCardLight";
import { ScrollView } from "react-native-gesture-handler";

const OfferList = (props) => {
  var categoryId = props.categoryChosenData.categoryId;
  var subCategoryId = props.subCategoryChosenData.subCategoryId;

  const [offerList, setOfferList] = useState();

  useEffect(() => {
    //requete pour récuperer au pres de la route recherche, toutes les offres en fonction de l'ID de la subcategory choisie ou categoryId

    var getOfferWithId = async function () {
      const data = await fetch(`http://${REACT_APP_IPSERVER}/recherche`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `subcategorieId=${subCategoryId}&categorieId=${categoryId}`,
      });
      var offerList = await data.json();
      offerList = offerList.offerList;
      setOfferList(offerList);
    };
    getOfferWithId();
  }, [props.subCategoryChosenData]);

  //Si on trouve des offre, on appelle le composant OfferCardMain en lui passant les propriétés de la liste

  if (offerList) {
    var listOfferCard = offerList.map((e, i) => {
      return <OfferCardMain key={i} dataOffre={e} navigation={props.navigation}></OfferCardMain>;
    });
  } else {
    var listOfferCard = <Text>Pas d'offre</Text>;
  }

  return <ScrollView>{listOfferCard}</ScrollView>;
};

function mapStateToProps(state) {
  return {
    categoryChosenData: state.categoryChosenData,
    subCategoryChosenData: state.subCategoryChosenData,
  };
}

export default connect(mapStateToProps, null)(OfferList);
