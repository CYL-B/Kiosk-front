import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";
import CateGoriesList from "../components/SearchElements/CategoriesList";
import SubCategoriesList from "../components/SearchElements/SubCategoriesList";
import OfferList from "../components/SearchElements/OfferList";

import { connect } from "react-redux";

import Searchbar from "../components/SearchBar";
import { HeaderBar } from "../components/Header";

const SearchScreen = (props) => {
  const [menuToShow, setMenuToShow] = useState(
    <CateGoriesList></CateGoriesList>
  );

  useEffect(() => {
    //condition pour afficher soir la liste de categorie, soit la liste de sous categorie, sois la liste de résultat

    if (props.categoryChosenData == "") {
      setMenuToShow(<CateGoriesList></CateGoriesList>);
    } else if (
      props.categoryChosenData.categoryName !== "" &&
      props.subCategoryChosenData === ""
    ) {
      setMenuToShow(<SubCategoriesList></SubCategoriesList>);
    } else if (props.subCategoryChosenData !== "") {
      setMenuToShow(<OfferList></OfferList>);
    }
    return menuToShow;
  }, [props.categoryChosenData, props.subCategoryChosenData]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <HeaderBar leftComponent title="Recherche"
      navigation={props.navigation}></HeaderBar>
      <Searchbar></Searchbar>
      {menuToShow}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    categoryChosenData: state.categoryChosenData,
    subCategoryChosenData: state.subCategoryChosenData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setcategoriesList: function (categorieslist) {
      dispatch({ type: "setcategoriesList", categorieslist });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
