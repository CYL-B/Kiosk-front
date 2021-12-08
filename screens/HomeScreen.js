import React, { useEffect } from "react";
import { View, Text } from "react-native";
// Import des composants Button customisés
import { Button, ButtonText } from "../components/Buttons";

import SubCategoriesListHori from "../components/SubCategoriesListHori";

import { connect } from "react-redux";

import { REACT_APP_IPSERVER } from "@env";

const HomeScreen = (props) => {
  useEffect(() => {
    var setcategorieslist = async function () {
      const data = await fetch(`http://${REACT_APP_IPSERVER}/getcategories`);
      const body = await data.json();
      var categorieslist = body.categorieList;
      props.setcategoriesList(categorieslist);
    };
    setcategorieslist();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <SubCategoriesListHori></SubCategoriesListHori>
      <Button
        size="md"
        color="primary"
        title="Company Page"
        onPress={() => props.navigation.navigate("CompanyPage")}
      />
    </View>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setcategoriesList: function (categorieslist) {
      dispatch({ type: "setcategoriesList", categorieslist });
    },
  };
}

export default connect(null, mapDispatchToProps)(HomeScreen);
