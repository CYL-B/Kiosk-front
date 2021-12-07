import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";
import CateGoriesList from "../components/SearchElements/CategoriesList";
import SubCategoriesList from "../components/SearchElements/SubCategoriesList";

import { connect } from "react-redux";

import Searchbar from "../components/SearchBar";
import { HeaderBar } from "../components/Header";

import { REACT_APP_IPSERVER } from "@env";

const SearchScreen = (props) => {
  const [menuToShow, setMenuToShow] = useState(
    <CateGoriesList></CateGoriesList>
  );

  useEffect(() => {
    var setcategorieslist = async function () {
      const data = await fetch(`http://${REACT_APP_IPSERVER}/getcategories`);
      const body = await data.json();
      var categorieslist = body.categorieList;
      //console.log(categorieslist);
      props.setcategoriesList(categorieslist);
    };
    setcategorieslist();
  }, []);

  useEffect(() => {
    //condition pour afficher soir la liste de categorie, soit la liste de sous categorie, sois la liste de résultat
    if (props.categoryChoice == "") {
      setMenuToShow(<CateGoriesList></CateGoriesList>);
    } else if (props.categoryChoice !== "" && props.subCategoryChoice === "") {
      setMenuToShow(<SubCategoriesList></SubCategoriesList>);
    } else if (props.subCategoryChoice !== "") {
      setMenuToShow(<Text>ecran offre</Text>);
    }
    return menuToShow;
  }, [props.categoryChoice, props.subCategoryChoice]);

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <HeaderBar leftComponent title="Recherche"></HeaderBar>
      <Searchbar></Searchbar>
      {menuToShow}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    categoryChoice: state.categoryChoice,
    subCategoryChoice: state.subCategoryChoice,
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
